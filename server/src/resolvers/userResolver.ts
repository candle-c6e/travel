import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from 'bcrypt'
import { Users } from "../entities/users";
import { HotelUser, LoginInput, RegisterInput, ResponseHotelsUser, ResponseReservedUser, UpdateProfileInput, UserWithToken } from "../types/users";
import { PaginateInput } from '../types'
import { generateToken } from "../utils/token";
import { Context } from "../types/context";
import { Hotels } from "../entities/hotels";
import { Reservations } from "../entities/reservations";

@Resolver()
export class UserResolver {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>,
    @InjectRepository(Hotels) private readonly hotelsRepository: Repository<Hotels>,
    @InjectRepository(Reservations) private readonly reservationsReposity: Repository<Reservations>
  ) { }
  @Query(() => Users, { nullable: true })
  async me(
    @Ctx() ctx: Context
  ): Promise<Users | null> {
    let user = ctx.user
    if (!user) return null

    user = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.avatar'])
      .where('users.id = :id', { id: ctx.user.id })
      .getOne()

    return user
  }

  @Query(() => ResponseReservedUser)
  @Authorized()
  async reservedUsers(
    @Arg('paginateInput') paginateInput: PaginateInput,
    @Ctx() ctx: Context
  ): Promise<ResponseReservedUser> {

    const reserved = await this.reservationsReposity.query(
      `
        SELECT t1.id, t1.hotel_id, t1.created_at, Date(t1.start_date) as start_date, Date(t1.end_date) as end_date, (t1.end_date::DATE - t1.start_date::DATE) + 1 as days, hotels."name", t3.url
        FROM reservations as t1
        INNER JOIN (
          SELECT * FROM hotels
        ) AS hotels ON hotels.id = t1.hotel_id
        INNER JOIN (
          SELECT min(id) AS id, hotel_id FROM hotel_images
          GROUP BY hotel_id
        ) AS t2 ON t2.hotel_id = hotels.id
        INNER JOIN (
          SELECT id, url
          FROM hotel_images
        ) AS t3 ON t3.id = t2.id
        WHERE user_id = $1
        ORDER BY t1.created_at
        OFFSET ${paginateInput.offset}
        LIMIT ${paginateInput.limit}
      `
      , [ctx.user.id])

    const totalRows = await this.reservationsReposity.query(
      `
        SELECT t1.id, t1.hotel_id, t1.created_at, Date(t1.start_date) as start_date, Date(t1.end_date) as end_date, (t1.end_date::DATE - t1.start_date::DATE) + 1 as days, hotels."name", t3.url
        FROM reservations as t1
        INNER JOIN (
          SELECT * FROM hotels
        ) AS hotels ON hotels.id = t1.hotel_id
        INNER JOIN (
          SELECT min(id) AS id, hotel_id FROM hotel_images
          GROUP BY hotel_id
        ) AS t2 ON t2.hotel_id = hotels.id
        INNER JOIN (
          SELECT id, url
          FROM hotel_images
        ) AS t3 ON t3.id = t2.id
        WHERE user_id = $1
      `
      , [ctx.user.id])

    return {
      reserved,
      totalPages: Math.ceil(totalRows.length / 3)
    }
  }

  @Query(() => ResponseHotelsUser)
  @Authorized()
  async hotelsUser(
    @Arg('paginateInput') paginateInput: PaginateInput,
    @Ctx() ctx: Context
  ): Promise<ResponseHotelsUser> {
    const hotels: HotelUser[] = await this.hotelsRepository.query(
      `
        SELECT hotels.id, hotels.created_at, hotels.name, t3.url
        FROM hotels
        INNER JOIN (
          SELECT MIN(id) as id, hotel_id
          FROM hotel_images
          GROUP BY hotel_id
        ) AS t2 ON t2.hotel_id = hotels.id
        INNER JOIN (
          SELECT id, url
          FROM hotel_images
        ) AS t3 ON t3.id = t2.id
        WHERE owner_id = $1
        ORDER BY hotels.created_at DESC
        OFFSET ${paginateInput.offset}
        LIMIT ${paginateInput.limit}
      `
      , [ctx.user.id])

    const totalRows: HotelUser[] = await this.hotelsRepository.query(
      `
        SELECT hotels.id, hotels.created_at, hotels.name, t3.url
        FROM hotels
        INNER JOIN (
          SELECT MIN(id) as id, hotel_id
          FROM hotel_images
          GROUP BY hotel_id
        ) AS t2 ON t2.hotel_id = hotels.id
        INNER JOIN (
          SELECT id, url
          FROM hotel_images
        ) AS t3 ON t3.id = t2.id
        WHERE owner_id = $1
      `
      , [ctx.user.id])


    return {
      hotel: hotels,
      totalPages: Math.ceil(totalRows.length / 3)
    }
  }

  @Mutation(() => Users, { nullable: true })
  async user(
    @Arg('id') id: number
  ): Promise<Users | null> {

    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where("users.id = :id", { id })
      .getOne()

    if (!user) throw new Error('user is not exists.')

    return { ...user }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async updateAvatar(
    @Arg('url') url: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const { affected } = await this.usersRepository.update({ id: ctx.user.id }, { avatar: url })
    if (!affected) return false
    return true
  }

  @Mutation(() => Users)
  @Authorized()
  async updateProfile(
    @Arg('updateProfileInput') { name, password, confirmPassword }: UpdateProfileInput,
    @Ctx() ctx: Context
  ) {
    if (password !== confirmPassword) throw new Error('password is not valid.')

    let result: any = null

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const { affected, raw } = await this.usersRepository.createQueryBuilder()
        .update({ name, password: hashedPassword })
        .where("id = :id", { id: ctx.user.id })
        .returning('*')
        .execute()
      if (!affected) throw new Error('user is not exists.')
      result = raw[0]
    } else {
      const { affected, raw } = await this.usersRepository.createQueryBuilder()
        .update({ name })
        .where("id = :id", { id: ctx.user.id })
        .returning('*')
        .execute()
      if (!affected) throw new Error('user is not exists.')
      result = raw[0]
    }

    return result
  }

  @Mutation(() => UserWithToken)
  async login(
    @Arg('loginInput') loginInput: LoginInput
  ): Promise<UserWithToken> {

    const user = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.avatar', 'users.password'])
      .where("users.username = :username", { username: loginInput.username })
      .getOne()

    if (!user) throw new Error('user is not exists.')

    const isMatched = await bcrypt.compare(loginInput.password, user.password)

    if (!isMatched) throw new Error('password is not correct.')

    const token = generateToken(user)

    return {
      users: user,
      token
    }
  }

  @Mutation(() => UserWithToken)
  async register(
    @Arg('registerInput') registerInput: RegisterInput
  ): Promise<UserWithToken> {


    const user = await this.usersRepository.findOne({ username: registerInput.username })

    if (user) throw new Error('user is exists.')

    const hashedPassword = await bcrypt.hash(registerInput.password, 10)

    const result = await this.usersRepository.save({
      name: registerInput.name,
      username: registerInput.username,
      password: hashedPassword
    })

    const token = generateToken(result)

    return {
      users: result,
      token
    }
  }
}
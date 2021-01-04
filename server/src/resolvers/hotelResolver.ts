import path from 'path'
import fs from 'fs/promises'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import * as Moment from "moment";
import { extendMoment } from "moment-range";

import { Context } from "../types/context";
import { Hotels } from "../entities/hotels";
import { HotelImages } from "../entities/hotelImages";
import { Reservations } from '../entities/reservations';
import { HotelEditInput, HotelInput, HotelsType, ResponseHotel, ResponseHotels } from "../types/hotel";
import { PaginateInput } from '../types';

const moment = extendMoment(Moment);

const __LIMIT__ = 6

@Resolver()
export class HotelResolver {
  constructor(
    @InjectRepository(Hotels) private readonly hotelsRepository: Repository<Hotels>,
    @InjectRepository(HotelImages) private readonly hotelImagesRepository: Repository<HotelImages>,
    @InjectRepository(Reservations) private readonly reservationRepository: Repository<Reservations>
  ) { }

  @Query(() => [Hotels])
  async searchHotel(
    @Arg('search', { nullable: true }) search?: string
  ): Promise<Hotels[]> {

    const hotels = await this.hotelsRepository
      .createQueryBuilder('hotels')
      .where("hotels.name like :search", { search: `%${search}%` })
      .getMany()

    return hotels
  }

  @Query(() => ResponseHotels)
  async hotels(
    @Arg('paginateInput') paginateInput: PaginateInput,
  ): Promise<ResponseHotels> {

    const hotels: HotelsType[] = await this.hotelsRepository.query(
      `
        SELECT t1.id, t1."name", t1.created_at, t3.url
        FROM hotels AS t1
        INNER JOIN (
          SELECT MIN(id) as id, hotel_id
          FROM hotel_images
          GROUP BY hotel_id
        ) AS t2 ON t2.hotel_id = t1.id
        INNER JOIN (
          SELECT id, url
          FROM hotel_images
        ) AS t3 ON t3.id = t2.id
        ORDER BY t1.created_at DESC
        OFFSET ${paginateInput.offset}
        LIMIT ${paginateInput.limit}
      `
    )

    const totalPages = await this.hotelsRepository.count({})

    return {
      hotels,
      totalPages: Math.ceil(totalPages / __LIMIT__)
    }
  }

  @Query(() => ResponseHotel, { nullable: true })
  async hotel(
    @Arg('id') id: number
  ): Promise<ResponseHotel> {

    const hotel = await this.hotelsRepository.createQueryBuilder('hotels')
      .select([
        'hotels.id',
        'hotels.name',
        'hotels.bio',
        'hotels.address',
        'hotels.latitude',
        'hotels.longitude',
        'hotels.price',
        'users.name',
        'users.avatar'
      ])
      .innerJoin('hotels.user', 'users')
      .where('hotels.id = :id', { id })
      .getOne()

    const reservations = await this.reservationRepository.find({ where: { hotel_id: id } })
    const hotelImages = await this.hotelImagesRepository.find({ select: ['url'], where: { hotel_id: id }, take: 5 })

    let reservedDates: any = [];
    for (let date of reservations) {
      const start = date.start_date;
      const end = date.end_date;
      const range = moment.range(start, end);
      for (let date of range.by('day')) {
        reservedDates.push(date.format('YYYY-MM-DD'))
      }
    }

    if (!hotel) throw new Error('hotel is exists.')

    return {
      hotel,
      hotelImages,
      reservedDates
    }
  }

  @Mutation(() => Hotels, { nullable: true })
  @Authorized()
  async addHotel(
    @Arg('hotelInput') { name, address, bio, latitude, longitude, images, price }: HotelInput,
    @Ctx() ctx: Context
  ): Promise<Hotels | null> {
    try {
      const hotel = await this.hotelsRepository.findOne({ name: name })

      if (hotel) throw new Error('hotel is exists.')

      const { id } = await this.hotelsRepository.save({
        name: name,
        address: address,
        bio: bio,
        latitude: latitude,
        longitude: longitude,
        price,
        location: { type: 'Point', coordinates: [longitude, latitude] },
        owner_id: ctx.user.id,
        created_at: new Date(),
        updated_at: new Date()
      })

      if (images && images.length) {
        for (let image of images) {
          await this.hotelImagesRepository.save({
            url: image,
            hotel_id: id,
            created_at: new Date()
          })
        }
      }

      const result = await this.hotelsRepository
        .createQueryBuilder("hotels")
        .select([
          "hotels.id",
          "hotels.name",
          "hotels.bio",
          "hotelImages.url"
        ])
        .innerJoin('hotels.hotelImages', 'hotelImages')
        .where('hotels.id = :id', { id })
        .getOne()

      return result!
    } catch (err) {
      if (images && images.length) {
        for (let image of images) {
          fs.unlink(path.resolve(__dirname, `../../uploads/hotels/${image}`))
        }
      }
      return null
    }
  }

  @Mutation(() => Hotels, { nullable: true })
  @Authorized()
  async updateHotel(
    @Arg('hotelEditInput') { address, bio, latitude, longitude, name, hotel_id, images }: HotelEditInput,
    @Ctx() ctx: Context
  ): Promise<Hotels> {

    const hotel = await this.hotelsRepository.findOne({ id: hotel_id })

    if (!hotel) throw new Error('hotel is not exists.')

    if (hotel.owner_id !== ctx.user.id) throw new Error('you are not permitted.')

    const { affected, raw } = await this.hotelsRepository.createQueryBuilder().update({
      name: name,
      address: address,
      bio: bio,
      latitude: latitude,
      longitude: longitude,
      location: { type: 'Point', coordinates: [longitude, latitude] },
    }).where("id = :id", { id: hotel_id })
      .returning(["id", "name", ""])
      .execute()

    if (images && images.length) {
      for (let image of images) {
        await this.hotelImagesRepository.save({
          url: image,
          hotel_id,
          created_at: new Date()
        })
      }
    }

    if (!affected) throw new Error('hotel is not exists.')

    const hotelImages = await this.hotelImagesRepository.find({ where: { hotel_id }, order: { created_at: "DESC" } })

    return {
      ...raw[0],
      hotelImages
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteHotel(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ) {

    const hotel = await this.hotelsRepository.findOne({ id })

    if (!hotel) throw new Error('hotel is not exists.')

    if (hotel.owner_id !== ctx.user.id) throw new Error('you are not permitted.')

    const images = await this.hotelImagesRepository.find({ where: { hotel_id: id } })

    await this.hotelImagesRepository.delete({ hotel_id: id })
    await this.hotelsRepository.delete({ id })

    for (let image of images) {
      fs.unlink(path.resolve(__dirname, `../../uploads/hotels/${image.url}`))
    }

    return true
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteHotelImage(
    @Arg('id') id: number,
    @Arg('url') url: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const hotel = await this.hotelsRepository.findOne({ id })
    if (!hotel) throw new Error('hotel is not exists.')

    const { affected } = await this.hotelImagesRepository.delete({ url })

    if (affected && hotel.owner_id === ctx.user.id) {
      fs.unlink(path.resolve(__dirname, `../../uploads/hotels/${url}`))
    }

    return true
  }
}
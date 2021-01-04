import { Field, InputType, ObjectType } from "type-graphql";
import { MinLength } from "class-validator";
import { Users } from "../entities/users";

@ObjectType()
export class HotelUser {
  @Field(() => Number)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  url: string
}

@ObjectType()
export class ResponseHotelsUser {
  @Field(() => [HotelUser])
  hotel: HotelUser[]

  @Field(() => Number)
  totalPages: number
}

@ObjectType()
export class ReservedUser {
  @Field(() => Number)
  id: number

  @Field(() => Number)
  hotel_id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  url: string

  @Field(() => Date)
  start_date: Date

  @Field(() => Date)
  end_date: Date

  @Field(() => Number)
  days: number

  @Field(() => Date)
  created_at: Date
}

@ObjectType()
export class ResponseReservedUser {
  @Field(() => [ReservedUser])
  reserved: ReservedUser[]

  @Field(() => Number)
  totalPages: number
}

@ObjectType()
export class UserWithToken {
  @Field()
  users: Users

  @Field()
  token: string
}

@InputType()
export class RegisterInput {
  @Field()
  @MinLength(2)
  name: string

  @Field()
  @MinLength(3)
  username: string

  @Field()
  @MinLength(3)
  password: string
}

@InputType()
export class LoginInput {
  @Field()
  @MinLength(3)
  username: string

  @Field()
  @MinLength(3)
  password: string
}

@InputType()
export class UpdateProfileInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  password: string

  @Field(() => String, { nullable: true })
  confirmPassword: string
}
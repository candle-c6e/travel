import { MinLength } from "class-validator";
import { HotelImages } from "../entities/hotelImages";
import { Hotels } from "../entities/hotels";
import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class HotelsType {
  @Field(() => Number)
  id: number

  @Field(() => String)
  name: string

  @Field(() => String)
  url: string
}

@ObjectType()
export class ResponseHotels {
  @Field(() => [HotelsType])
  hotels: HotelsType[]

  @Field(() => Number)
  totalPages: number
}

@ObjectType()
export class ResponseHotel {
  @Field(() => Hotels)
  hotel: Hotels

  @Field(() => [HotelImages])
  hotelImages: HotelImages[]

  @Field(() => [String])
  reservedDates: string[]
}

@InputType()
export class HotelInput {
  @Field(() => String)
  @MinLength(5)
  name: string

  @Field(() => String, { nullable: true })
  @MinLength(10)
  address: string

  @Field(() => String, { nullable: true })
  bio: string

  @Field(() => Number)
  price: number

  @Field(() => Number)
  latitude: number

  @Field(() => Number)
  longitude: number

  @Field(() => [String])
  images?: string[]
}

@InputType()
export class HotelEditInput extends HotelInput {
  @Field(() => Int)
  hotel_id: number
}
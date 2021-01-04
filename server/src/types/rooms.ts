import { IsNotEmpty, IsNumber, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RoomInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  room: string

  @Field()
  @IsNotEmpty()
  @IsNumber()
  price: number

  @Field()
  @IsNotEmpty()
  @IsNumber()
  hotel_id: number
}
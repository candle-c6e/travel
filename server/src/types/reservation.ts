import { Field, InputType } from "type-graphql";

@InputType()
export class ReserveInput {
  @Field(() => Number)
  hotel_id: number

  @Field(() => Number)
  price: number

  @Field(() => Date)
  start_date: Date

  @Field(() => Date)
  end_date: Date
}
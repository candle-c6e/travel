import { Field, InputType } from "type-graphql";

@InputType()
export class PaginateInput {
  @Field(() => Number)
  offset: number

  @Field(() => Number)
  limit: number
}
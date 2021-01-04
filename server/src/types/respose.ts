import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Response {
  @Field()
  success: boolean

  @Field(() => [String])
  data: any
}
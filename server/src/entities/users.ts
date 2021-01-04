import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hotels } from "./hotels";
import { Reservations } from "./reservations";

@Entity()
@ObjectType()
export class Users {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: "varchar",
    length: 40,
    nullable: false
  })
  name: string

  @Column({
    type: "varchar",
    length: 40,
    nullable: false,
    unique: true
  })
  username: string

  @Column({
    type: "varchar",
    length: 100,
    nullable: false
  })
  password: string

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  avatar: string | null

  @Field()
  @Column({
    type: 'timestamp with time zone',
    default: new Date()
  })
  created_at: Date

  @Field()
  @Column({
    type: 'timestamp with time zone',
    default: new Date()
  })
  updated_at: Date

  @Field(() => [Hotels])
  @OneToMany(() => Hotels, hotel => hotel.user)
  hotels: Hotels[]

  @Field(() => [Reservations])
  @OneToMany(() => Reservations, reservations => reservations.user)
  reservations: Reservations[]
}
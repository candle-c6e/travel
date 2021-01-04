import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotels } from "./hotels";
import { Users } from "./users";

@ObjectType()
@Entity()
export class Reservations {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'integer'
  })
  price: number;

  @Field()
  @Column({
    type: 'timestamp with time zone'
  })
  start_date: Date

  @Field()
  @Column({
    type: 'timestamp with time zone'
  })
  end_date: Date

  @Field()
  @CreateDateColumn()
  created_at: Date

  @Column()
  hotel_id: number

  @Column()
  user_id: number

  @Field(() => Hotels)
  @ManyToOne(() => Hotels, hotels => hotels.reservations)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotels

  @Field(() => Users)
  @ManyToOne(() => Users, users => users.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users
}
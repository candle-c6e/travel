import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotels } from "./hotels";

@Entity()
@ObjectType()
export class HotelImages {
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({
    type: 'varchar',
    length: 255
  })
  url: string

  @Field()
  @CreateDateColumn()
  created_at: Date

  @Column()
  hotel_id: number

  @Field(() => Hotels)
  @ManyToOne(() => Hotels, hotels => hotels.hotelImages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotels
}
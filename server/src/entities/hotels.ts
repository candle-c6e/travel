import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Geometry } from 'geojson'
import { Users } from "./users";
import { HotelImages } from "./hotelImages";
import { Reservations } from "./reservations";

@Entity()
@ObjectType()
export class Hotels {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  name: string

  @Field()
  @Column({
    type: 'varchar',
    nullable: true,
    length: 400,
  })
  bio: string

  @Field()
  @Column({
    type: 'varchar',
    nullable: true,
    length: 400
  })
  address: string

  @Field()
  @Column({
    type: "double precision",
    nullable: true
  })
  latitude: number

  @Field()
  @Column({
    type: "double precision",
    nullable: true
  })
  longitude: number

  @Field(() => Number)
  @Column({
    type: 'geometry',
    nullable: true,
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Geometry

  @Field(() => Number)
  @Column({
    type: 'integer',
    default: 0
  })
  price: number

  @CreateDateColumn()
  @Column({
    type: 'timestamp with time zone',
    default: new Date()
  })
  created_at: Date

  @UpdateDateColumn()
  @Column({
    type: 'timestamp with time zone',
    default: new Date()
  })
  updated_at: Date

  @Column()
  owner_id: number

  @Field(() => Users)
  @ManyToOne(() => Users, users => users.hotels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  user: Users

  @Field(() => [HotelImages])
  @OneToMany(() => HotelImages, hotelImages => hotelImages.hotel)
  hotelImages: HotelImages[]

  @Field(() => [Reservations])
  @OneToMany(() => Reservations, reservations => reservations.hotel)
  reservations: Reservations[]
}
import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { Reservations } from "../entities/reservations";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ReserveInput } from "../types/reservation";
import { Context } from "../types/context";

@Resolver()
export class ReservationResolver {
  constructor(
    @InjectRepository(Reservations) private readonly reservationRepository: Repository<Reservations>
  ) { }

  @Mutation(() => Boolean)
  @Authorized()
  async addReservation(
    @Arg('reserveInput') { price, start_date, end_date, hotel_id }: ReserveInput,
    @Ctx() ctx: Context
  ): Promise<true> {

    await this.reservationRepository.save({
      price,
      start_date,
      end_date,
      hotel_id,
      user_id: ctx.user.id,
      created_at: new Date(),
      updated_at: new Date()
    })

    return true
  }
}

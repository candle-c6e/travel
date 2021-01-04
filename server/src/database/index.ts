import { createConnection } from 'typeorm'
import { Hotels } from '../entities/hotels'
import { Users } from '../entities/users'
import { HotelImages } from '../entities/hotelImages'
import { Reservations } from '../entities/reservations'


async function connection() {
  await createConnection({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE,
    entities: [
      Users,
      Hotels,
      HotelImages,
      Reservations
    ],
    synchronize: true,
    logging: false
  })
}

export default connection
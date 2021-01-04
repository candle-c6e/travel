import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import express from 'express'
import connection from './database';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { graphqlUploadExpress } from 'graphql-upload'
import { UserResolver } from './resolvers/userResolver';
import { HotelResolver } from './resolvers/hotelResolver';
import { customAuthChecker, getUser } from './middleware/auth';
import { UploadResolver } from './resolvers/uploadResolver';
import { ReservationResolver } from './resolvers/reservationResolver';

const PORT = process.env.PORT || 4000;
const PATH = '/graphql'

TypeORM.useContainer(Container);

async function main() {
  const app = express();

  app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')))
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  await connection()

  const schema = await buildSchema({
    resolvers: [UserResolver, HotelResolver, UploadResolver, ReservationResolver],
    authChecker: customAuthChecker,
    container: Container
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const user = getUser(req)
      return {
        req,
        user
      }
    },
    uploads: false,
    formatError: (err) => {
      // if (err?.extensions?.code) {
      //   return new Error('INTERNAL SERVER ERROR');
      // }
      return err;
    }
  })

  server.applyMiddleware({ app, path: PATH })

  app.listen(PORT, () => {
    console.log('server is running 🚀')
  })
}

main()
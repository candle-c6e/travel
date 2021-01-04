import { Request } from 'express'
import { AuthChecker } from "type-graphql";
import jwt from 'jsonwebtoken'
import { Context } from "../types/context";

export const customAuthChecker: AuthChecker<Context> = ({ context }) => {
  const req = context.req as any
  try {
    const authorization = req.headers.authorization || ''

    if (!authorization) {
      return false
    }
    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.TOKEN_SECRET!)

    return true
  } catch (err) {
    throw new Error('You are not authorized.')
  }
};

export const getUser = (req: Request) => {
  try {
    const authorization = req.headers.authorization || ''

    if (!authorization) {
      return false
    }
    const token = authorization.split(' ')[1]

    const user = jwt.verify(token, process.env.TOKEN_SECRET!)

    return user
  } catch (err) {
    throw new Error('You are not authorized.')
  }
};
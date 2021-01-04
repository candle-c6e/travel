import { Request } from 'express'

export interface Context {
  req: Request;
  user: any
}
import jwt from 'jsonwebtoken'
import { Users } from '../entities/users'

export const generateToken = (user: Users) => {
  return jwt.sign({ id: user.id, name: user.name }, process.env.TOKEN_SECRET!, { expiresIn: '7d' })
}
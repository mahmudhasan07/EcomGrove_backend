import 'dotenv/config'
import { Secret } from 'jsonwebtoken'
export const port = process.env.PORT
export const tokenKey : Secret = process.env.TOKEN_SECRET || ""
import { PrismaClient } from "@prisma/client"
import { Request } from "express"
import Jwt from "jsonwebtoken"
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient()

interface UserDetails {
    id: string;
}
const createCartIntoDB = async (req: Request) => {
    const token = req.headers.authorization
    const { id } = Jwt.decode(token as string) as UserDetails
    const data = req.body
    // const userDetails = Jwt.decode(token as string) as object
    const addedCart = await prisma.cart.findFirst({
        where: {
            userId: id,
            productId: data.productId
        }
    })
    if (addedCart) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Product already added to cart")
    }
    const result = await prisma.cart.create({
        data: {
            ...data,
            userId: id
        }
    })
    return result
}


const getCartFromDB = async (req: Request) => {
    const token = req.headers.authorization
    const { id } = Jwt.decode(token as string) as UserDetails



    const result = await prisma.cart.findMany({
        where: {
            userId: id
        },
        include: {
            productDetails: true
        }
    })


    return result
}

export const cartService = { createCartIntoDB, getCartFromDB }
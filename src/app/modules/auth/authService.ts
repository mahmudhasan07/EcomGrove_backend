import { PrismaClient } from "@prisma/client"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"
import { OTPFn } from "../../../shared/OTPFn"

const prisma = new PrismaClient()
const logInFormDB = async (payload: { email: string, password: string }) => {
    const finderUser = await prisma.user.findUnique({
        where: {
            email: payload?.email
        }
    })

    if (!finderUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }

    if (finderUser?.status === "PENDING") {
        OTPFn(payload.email)
        return { message: 'Please verify your email' }
    }
    if (finderUser?.status === "BLOCKED") {
        return { message: 'Your account has been blocked' }
    }

}
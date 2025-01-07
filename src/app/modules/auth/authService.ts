import { PrismaClient } from "@prisma/client"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"
import { OTPFn } from "../../../shared/OTPFn"

const prisma = new PrismaClient()
const logInFormDB = async (payload: { email: string, password: string }) => {
    // console.log(payload)
    const finderUser = await prisma.user.findUnique({
        where: {
            email: payload?.email
        }
    })

    // console.log(finderUser);
    

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
    if (finderUser?.password !== payload.password) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect')
    }

    return { id: finderUser.id, email: finderUser.email, role: finderUser.role }

}


export const authService = { logInFormDB }
import { PrismaClient } from "@prisma/client"
import ApiError from "../../error/ApiErrors"
import { StatusCodes } from "http-status-codes"
import { OTPFn } from "../../../shared/OTPFn"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { tokenKey } from "../../../config/secret"
import { myCache } from "../../../app"

const prisma = new PrismaClient()

const logInFormDB = async (payload: { email: string, password: string }) => {
    // console.log(payload)
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

    const confirmPass = await compare(payload.password, finderUser.password)

    // const confirmPass = compare(finderUser.password, payload.password)


    if (!confirmPass) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Password is incorrect')
    }

    if (!finderUser) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    const { password, ...userDetails } = finderUser

    const token = jwt.sign( userDetails, tokenKey, { expiresIn: "24h" })

    return { accessToken: token, user: { email: finderUser.email, role: finderUser.role, firstName: finderUser.firstName, lastName: finderUser.lastName } }
}


const forgetPassFromDB = async (payload: { email: string }) => {

    const finderUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (!finderUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User not found")
    }

    OTPFn(payload.email)

}

const verifyOtp = async (payload: { email: string, otp: string }) => {
    const otp = myCache.get(payload?.email)
    if (!otp) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP expired')
    }
    if (otp !== parseInt(payload.otp)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid OTP')
    }
    const finderUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (!finderUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User not found")
    }
    const { password, ...userDetails } = finderUser
    const token = jwt.sign(userDetails, tokenKey, { expiresIn: '20min' })
    return { accessToken: token }

    return

}

export const authService = { logInFormDB, forgetPassFromDB, verifyOtp }
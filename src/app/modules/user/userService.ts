import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { hash } from "bcrypt";
import { OTPFn } from "../../../shared/OTPFn";
import { myCache } from "../../../app";

const prisma = new PrismaClient()

const createUser = async (payload: User) => {
    // console.log('User created successfully');
    const emailFinder = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (emailFinder) {
        throw new ApiError(StatusCodes.CONFLICT, 'Email already exists')
    }
    const password = await hash(payload.password, 10);


    const result = await prisma.user.create({
        data: {
            ...payload,
            password
        }
    })

    if (!result) {
        result
    }
    await OTPFn(payload.email)
    return result

}

const verifyOtp = async (payload: { email: string, otp: string }) => {
    const otp = myCache.get(payload?.email)
    if (!otp) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'OTP expired')
    }
    if (otp !== parseInt(payload.otp)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid OTP')
    }
    const result = await prisma.user.update({
        where: {
            email: payload.email
        },
        data: {
            status: 'ACTIVE'
        }
    })

    return result

}

const getAllUsers = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: "USER",
            status: "ACTIVE"
        }
    })
    if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'No user found')
    }
    return result
}


export const userService = { createUser, verifyOtp, getAllUsers } 
import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { hash } from "bcrypt";
import { OTPFn } from "../../../shared/OTPFn";
import { myCache } from "../../../app";

const prisma = new PrismaClient()

const createUser = async (req: any) => {
    // console.log('User created successfully');
    const file = req.file;
    const payload = req.body;

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
            password,
            uploadImage: file && file?.location

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


const changePasswordFromDB = async (payload: { email: string, password: string }) => {

    const user = await prisma.user.findUnique({ where: { email: payload.email } })
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }
    const hashedPassword = await hash(payload.password, 10)
    const result = await prisma.user.update({
        where: {
            email: payload.email
        },
        data: {
            password: hashedPassword
        }
    })

    return {result}
}


export const userService = { createUser, verifyOtp, getAllUsers, changePasswordFromDB } 
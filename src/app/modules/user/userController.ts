import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./userService";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createUserController = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    sendResponse(res, { statusCode: StatusCodes.CREATED, success: true, message: 'User created successfully', data: result })
})

const verifyOtpController = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.verifyOtp(req.body);
    sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: 'OTP verified successfully', data: result })
})

const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUsers();
    sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: 'All users', data: result })
})

export const userController = { createUserController, verifyOtpController, getAllUsersController }
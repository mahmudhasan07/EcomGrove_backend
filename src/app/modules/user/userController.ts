import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./userService";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createUserController = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createUser(req);
    sendResponse(res, { statusCode: StatusCodes.CREATED, success: true, message: 'Check your email address for verify your OTP', data: result })
})

const verifyOtpController = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.verifyOtp(req.body);
    sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: 'OTP verified successfully', data: result })
})

const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUsers();
    const pageNumber = req.query.page ? parseInt(req.query.page as string) : 1;
    const resultLimit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    
    sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: 'Get all users successfully', data: result.slice((pageNumber-1)*resultLimit,pageNumber*resultLimit) , meta:{limit:resultLimit,page:pageNumber,total:result.length} })
})

export const userController = { createUserController, verifyOtpController, getAllUsersController }
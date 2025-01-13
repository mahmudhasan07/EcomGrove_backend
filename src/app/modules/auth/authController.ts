import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./authService";
import { Request, Response } from "express";

const logInController = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.logInFormDB(req.body)
    sendResponse(res, { statusCode: StatusCodes.OK, message: 'Login success', data: result, success: true })
})

const forgetPassController = catchAsync(async(req : Request,res : Response)=>{
    const result = await authService.forgetPassFromDB(req.body)
    sendResponse (res, {success : true, statusCode : StatusCodes.ACCEPTED, message : "OTP send your email please check your email Address"})
})

const verifyOtpController = catchAsync(async (req: Request, res: Response)=>{
    const result = await authService.verifyOtp(req.body)
    sendResponse(res, {statusCode: StatusCodes.OK, message: 'user OTP verified',success: true, data:result})

})

export const authController = { logInController, forgetPassController, verifyOtpController}
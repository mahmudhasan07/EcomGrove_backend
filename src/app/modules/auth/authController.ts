import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./authService";

const logInController = catchAsync(async (req, res) => {
    const result = await authService.logInFormDB(req.body)
    sendResponse(res, { statusCode: StatusCodes.OK, message: 'Login success', data: result, success: true })
})

export const authController = { logInController }
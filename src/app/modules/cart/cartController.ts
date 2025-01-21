import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { cartService } from "./cartService";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createProductCart = catchAsync(async (req: Request, res: Response) => {
    const result = await cartService.createCartIntoDB(req);
    sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: "Cart successfully added", data: result })
})

const getCartByUser = catchAsync(async (req: Request, res: Response) => {
    const result = await cartService.getCartFromDB(req);
    sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: "Cart successfully retrieved", data: result })
})

export const cartController = { createProductCart, getCartByUser } 
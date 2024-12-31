import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { productServices } from "./productService";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createProductController = catchAsync(async (req: Request, res: Response) => {
    const result = await productServices.createProductInDb(req);
    sendResponse(res, { statusCode: StatusCodes.CREATED, success: true, message: "Product created successfully", data: result })
})

const getAllProductsController = catchAsync(async (req: Request, res: Response) => {
    const result = await productServices.getAllProductsFromDb();
    sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: "All products fetched successfully", data: result })
})

export const productController = { createProductController,getAllProductsController }
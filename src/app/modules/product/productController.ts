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

const deleteProductController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await productServices.deleteProductFromDb(id);
    sendResponse(res, { statusCode: StatusCodes.OK, success: true, message: "Product deleted successfully", data: result })
})

const updateProductController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await productServices.updateProductInDb(id, req.body);
    sendResponse(res, {statusCode: StatusCodes.OK, success: true, message: "Product updated successfully", data: result })
})

export const productController = { createProductController,getAllProductsController, deleteProductController,updateProductController }
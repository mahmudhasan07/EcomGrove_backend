import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { productServices } from "./productService";

const createProductController = catchAsync(async (req : Request, res:Response) => {
const result = await productServices.createProductInDb(req);
})

export const productController = { createProductController }
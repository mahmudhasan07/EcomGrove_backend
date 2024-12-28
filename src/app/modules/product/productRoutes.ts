import { Router } from "express";
import { fileUploader } from "../../helpers/uploadFile";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import { productController } from "./productController";

const route = Router()

route.post("/create",
    fileUploader.uploadProductImages,
    parseBodyMiddleware,
    productController.createProductController

)



export const productRoutes = route
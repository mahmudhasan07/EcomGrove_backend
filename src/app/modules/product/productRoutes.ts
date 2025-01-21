import { Router } from "express";
import { fileUploader } from "../../helpers/uploadFile";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import { productController } from "./productController";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";

const route = Router()

route.post("/create",
    auth(Role.ADMIN),
    fileUploader.uploadProductImages,
    parseBodyMiddleware,
    productController.createProductController,
)

route.get("/all", productController.getAllProductsController)
route.delete("/delete/:id", auth(Role.ADMIN), productController.deleteProductController)
route.put('/update/:id',
    auth(Role.ADMIN),
    fileUploader.uploadProductImages,
    parseBodyMiddleware,
    productController.updateProductController)



export const productRoutes = route
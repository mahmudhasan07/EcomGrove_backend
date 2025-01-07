import { Router } from "express";
import { userController } from "./userController";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./userValidation";
import { fileUploader } from "../../helpers/uploadFile";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";

const route = Router()

route.post('/create',
    fileUploader.uploadProfileImage,
    parseBodyMiddleware,
    validateRequest(userValidation.userRegisterValidationSchema),
    userController.createUserController
)

route.post("/verify-otp",
    userController.verifyOtpController
)

route.get("/all-users",
    userController.getAllUsersController
)


export const userRoutes = route

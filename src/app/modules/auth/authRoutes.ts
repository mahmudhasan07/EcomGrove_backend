import { Router } from "express";
import { authController } from "./authController";

const route = Router()

route.post("/login",
    authController.logInController
)

route.post("/forget-pass", authController.forgetPassController)

route.post("/verify-otp", authController.verifyOtpController)


export const authRoutes = route
import { Router } from "express";
import { authController } from "./authController";

const route = Router()

route.post("/login",
    authController.logInController
)

export const authRoutes = route
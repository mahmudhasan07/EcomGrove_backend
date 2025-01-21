import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { cartController } from "./cartController";

const route = Router()

route.post("/create",
    auth(Role.USER),
    cartController.createProductCart
)

route.get('/by-user',
    auth(Role.USER),
    cartController.getCartByUser
)

export const cartRoutes = route;
import express from "express";
import { userRoutes } from "../modules/user/userRoutes";
import { productRoutes } from "../modules/product/productRoutes";
import { authRoutes } from "../modules/auth/authRoutes";
import { cartRoutes } from "../modules/cart/cartRoutes";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/products",
    route: productRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/cart",
    route: cartRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

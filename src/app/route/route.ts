import express from "express";
import { userRoutes } from "../modules/user/userRoutes";
import { productRoutes } from "../modules/product/productRoutes";
import { authRoutes } from "../modules/auth/authRoutes";


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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

import express from "express";
import { userRoutes } from "../modules/user/userRoutes";
import { productRoutes } from "../modules/product/productRoutes";


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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

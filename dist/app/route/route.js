"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("../modules/user/userRoutes");
const productRoutes_1 = require("../modules/product/productRoutes");
const authRoutes_1 = require("../modules/auth/authRoutes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/users",
        route: userRoutes_1.userRoutes,
    },
    {
        path: "/products",
        route: productRoutes_1.productRoutes,
    },
    {
        path: "/auth",
        route: authRoutes_1.authRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

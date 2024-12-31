"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const uploadFile_1 = require("../../helpers/uploadFile");
const parseBodyData_1 = require("../../middleware/parseBodyData");
const productController_1 = require("./productController");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const route = (0, express_1.Router)();
route.post("/create", (0, auth_1.default)(client_1.Role.ADMIN), uploadFile_1.fileUploader.uploadProductImages, parseBodyData_1.parseBodyMiddleware, productController_1.productController.createProductController);
route.get("/all", productController_1.productController.getAllProductsController);
exports.productRoutes = route;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const productService_1 = require("./productService");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const createProductController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productService_1.productServices.createProductInDb(req);
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.CREATED, success: true, message: "Product created successfully", data: result });
}));
const getAllProductsController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield productService_1.productServices.getAllProductsFromDb();
    (0, sendResponse_1.default)(res, { statusCode: http_status_codes_1.StatusCodes.OK, success: true, message: "All products fetched successfully", data: result });
}));
exports.productController = { createProductController, getAllProductsController };

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProductInDb = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const file = req.files;
    const images = file && file.map((e) => e === null || e === void 0 ? void 0 : e.location);
    const result = yield prisma.product.create({
        data: Object.assign(Object.assign({}, payload), { images })
    });
    return result;
});
const getAllProductsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.product.findMany();
    return result;
});
exports.productServices = { createProductInDb, getAllProductsFromDb };

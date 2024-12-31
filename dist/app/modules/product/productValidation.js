"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const createProductValidation = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    brandName: zod_1.z.string(),
    categoryType: zod_1.z.enum(["ELECTRONICS", "Home_Kitchen", "BEAUTY", "SPORTS", "FASHION", "TOYS"]),
    category: zod_1.z.string(),
    images: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.productValidation = { createProductValidation };

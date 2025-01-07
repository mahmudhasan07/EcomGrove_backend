"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userRegisterValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, "First name must be at least 2 characters long"),
    lastName: zod_1.z.string().min(2, "Last name must be at least 2 characters long"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long"),
    phoneNumber: zod_1.z.string().min(11, "Phone number must be at least 11 characters long"),
    role: zod_1.z.enum(["ADMIN", "USER"]),
    address: zod_1.z.string().min(2, "Address must be at least 2 characters long"),
    city: zod_1.z.string().min(2, "City must be at least 2 characters long"),
    state: zod_1.z.string().min(2, "Country must be at least 2 characters long"),
    zipCode: zod_1.z.string().min(2, "Zip code must be at least 2 characters long"),
    uploadImage: zod_1.z.string().optional(),
    status: zod_1.z.enum(["ACTIVE", "BLOCKED", "PENDING"]).optional()
});
exports.userValidation = { userRegisterValidationSchema };

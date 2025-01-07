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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const ApiErrors_1 = __importDefault(require("../../error/ApiErrors"));
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = require("bcrypt");
const OTPFn_1 = require("../../../shared/OTPFn");
const app_1 = require("../../../app");
const prisma = new client_1.PrismaClient();
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('User created successfully');
    const file = req.file;
    const payload = req.body;
    const emailFinder = yield prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (emailFinder) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Email already exists');
    }
    const password = yield (0, bcrypt_1.hash)(payload.password, 10);
    const result = yield prisma.user.create({
        data: Object.assign(Object.assign({}, payload), { password, uploadImage: file && (file === null || file === void 0 ? void 0 : file.location) })
    });
    if (!result) {
        result;
    }
    yield (0, OTPFn_1.OTPFn)(payload.email);
    return result;
});
const verifyOtp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = app_1.myCache.get(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!otp) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'OTP expired');
    }
    if (otp !== parseInt(payload.otp)) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid OTP');
    }
    const result = yield prisma.user.update({
        where: {
            email: payload.email
        },
        data: {
            status: 'ACTIVE'
        }
    });
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.user.findMany({
        where: {
            role: "USER",
            status: "ACTIVE"
        }
    });
    if (!result) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'No user found');
    }
    return result;
});
exports.userService = { createUser, verifyOtp, getAllUsers };

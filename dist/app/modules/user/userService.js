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
const prisma = new client_1.PrismaClient();
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('User created successfully');
    const emailFinder = yield prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });
    if (emailFinder) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Email already exists');
    }
    const password = yield (0, bcrypt_1.hash)(payload.password, 10);
    yield (0, OTPFn_1.OTPFn)(payload.email);
    // const result = await prisma.user.create({
    //     data: {
    //         ...payload,
    //         password
    //     }
    // })
});
exports.userService = { createUser };

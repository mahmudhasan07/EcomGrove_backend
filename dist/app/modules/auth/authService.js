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
exports.authService = void 0;
const client_1 = require("@prisma/client");
const ApiErrors_1 = __importDefault(require("../../error/ApiErrors"));
const http_status_codes_1 = require("http-status-codes");
const OTPFn_1 = require("../../../shared/OTPFn");
const prisma = new client_1.PrismaClient();
const logInFormDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload)
    const finderUser = yield prisma.user.findUnique({
        where: {
            email: payload === null || payload === void 0 ? void 0 : payload.email
        }
    });
    // console.log(finderUser);
    if (!finderUser) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    if ((finderUser === null || finderUser === void 0 ? void 0 : finderUser.status) === "PENDING") {
        (0, OTPFn_1.OTPFn)(payload.email);
        return { message: 'Please verify your email' };
    }
    if ((finderUser === null || finderUser === void 0 ? void 0 : finderUser.status) === "BLOCKED") {
        return { message: 'Your account has been blocked' };
    }
    if ((finderUser === null || finderUser === void 0 ? void 0 : finderUser.password) !== payload.password) {
        throw new ApiErrors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Password is incorrect');
    }
    return { id: finderUser.id, email: finderUser.email, role: finderUser.role };
});
exports.authService = { logInFormDB };

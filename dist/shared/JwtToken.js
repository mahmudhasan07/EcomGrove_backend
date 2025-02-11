"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenGenerator = (user) => {
    const token = jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET, { expiresIn: 60 });
    return token;
};

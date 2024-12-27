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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const secret_1 = require("./config/secret");
const route_1 = __importDefault(require("./app/route/route"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const client_1 = require("@prisma/client");
// import { Prisma } from '@prisma/client'
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send({ message: "Welcome to the server!" });
});
const prisma = new client_1.PrismaClient();
function DataBase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            console.log(`Connect to the database`);
        }
        catch (error) {
            console.error("Failed to connect to the database:", error);
        }
    });
}
DataBase();
app.use("/api/v1", route_1.default);
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(500).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});
app.listen(secret_1.port, () => {
    console.log(`Server is running on port ${secret_1.port}`);
});

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
exports.myCache = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const secret_1 = require("./config/secret");
const route_1 = __importDefault(require("./app/route/route"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const node_cache_1 = __importDefault(require("node-cache"));
const mongodb_1 = require("mongodb");
// import { Prisma } from '@prisma/client'
exports.myCache = new node_cache_1.default({ stdTTL: 180 });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send({ message: "Welcome to the server!" });
});
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const databaseUrl = process.env.DATABASE_URL;
            if (!databaseUrl) {
                throw new Error('DATABASE_URL is not defined');
            }
            yield new mongodb_1.MongoClient(databaseUrl).connect();
            console.log('Connected to MongoDB');
        }
        catch (error) {
            console.error('Failed to connect to MongoDB:', error);
        }
    });
}
connectToMongoDB();
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
exports.default = app;

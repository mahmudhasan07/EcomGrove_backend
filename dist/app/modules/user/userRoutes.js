"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("./userController");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const userValidation_1 = require("./userValidation");
const uploadFile_1 = require("../../helpers/uploadFile");
const parseBodyData_1 = require("../../middleware/parseBodyData");
const route = (0, express_1.Router)();
route.post('/create', uploadFile_1.fileUploader.uploadProfileImage, parseBodyData_1.parseBodyMiddleware, (0, validateRequest_1.default)(userValidation_1.userValidation.userRegisterValidationSchema), userController_1.userController.createUserController);
route.post("/verify-otp", userController_1.userController.verifyOtpController);
route.get("/all-users", userController_1.userController.getAllUsersController);
exports.userRoutes = route;

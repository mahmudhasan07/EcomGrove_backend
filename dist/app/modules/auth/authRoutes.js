"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("./authController");
const route = (0, express_1.Router)();
route.post("/login", authController_1.authController.logInController);
exports.authRoutes = route;

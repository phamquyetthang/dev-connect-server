"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../common/middleware/authentication"));
const getControllers_1 = require("./controllers/getControllers");
const register_1 = require("./controllers/register");
const userRouter = express_1.Router();
const usePath = '/user';
userRouter.post(usePath + '/register', register_1.registerController);
userRouter.get(usePath + '/info', authentication_1.default, getControllers_1.getInfoController);
exports.default = userRouter;
//# sourceMappingURL=router.js.map
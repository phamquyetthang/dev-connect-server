"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const authRouter = express_1.Router();
const authPath = '/auth';
authRouter.post(authPath + '/signIn', controllers_1.signInController);
authRouter.post(authPath + '/forgot', controllers_1.forgotPasswordController);
exports.default = authRouter;
//# sourceMappingURL=router.js.map
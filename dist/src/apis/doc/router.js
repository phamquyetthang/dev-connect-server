"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../common/middleware/authentication"));
const getController_1 = require("./controllers/getController");
const postController_1 = require("./controllers/postController");
const docRouter = express_1.Router();
const docPath = '/doc';
docRouter.get(docPath, authentication_1.default, getController_1.getListDocController);
docRouter.post(docPath, authentication_1.default, postController_1.createDocController);
exports.default = docRouter;
//# sourceMappingURL=router.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../common/middleware/authentication"));
const postController_1 = require("./controllers/postController");
const getController_1 = require("./controllers/getController");
const putController_1 = require("./controllers/putController");
const projectRouter = express_1.Router();
const projectPath = '/project';
projectRouter.post(projectPath, authentication_1.default, postController_1.createProjectController);
projectRouter.get(projectPath, authentication_1.default, getController_1.getListProjectController);
projectRouter.get(projectPath + '/:id', authentication_1.default, getController_1.getInfoProjectController);
projectRouter.get(`${projectPath}/members/:id`, authentication_1.default, getController_1.getProjectMemberController);
projectRouter.put(projectPath + '/addMember', authentication_1.default, putController_1.addMemberController);
exports.default = projectRouter;
//# sourceMappingURL=router.js.map
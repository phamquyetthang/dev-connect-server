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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectMemberController = exports.getInfoProjectController = exports.getListProjectController = void 0;
const getService_1 = require("../services/getService");
function getListProjectController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.id;
            const response = yield getService_1.getListProjectService(userId);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getListProjectController = getListProjectController;
function getInfoProjectController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const projectId = req.params.id;
            const response = yield getService_1.getInfoProjectService(projectId);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getInfoProjectController = getInfoProjectController;
function getProjectMemberController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = req.params.id;
        try {
            const response = yield getService_1.getProjectMemberService(projectId);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProjectMemberController = getProjectMemberController;
//# sourceMappingURL=getController.js.map
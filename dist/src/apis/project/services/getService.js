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
exports.getProjectMemberService = exports.getInfoProjectService = exports.getListProjectService = void 0;
const HttpException_1 = __importDefault(require("../../../common/helpers/HttpException"));
const model_1 = __importDefault(require("../../../models/project/information/model"));
const model_2 = __importDefault(require("../../../models/user/account/model"));
function getListProjectService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield model_2.default.findById(userId);
        if (!user) {
            throw new HttpException_1.default(400, 'Tài khoản của bạn không tồn tại');
        }
        const projects = yield model_1.default
            .find({
            members: { $elemMatch: { member_id: userId } },
        })
            .select(['name', 'description', 'originator']);
        return projects;
    });
}
exports.getListProjectService = getListProjectService;
function getInfoProjectService(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const project = yield model_1.default.findById(projectId);
        if (!project) {
            throw new HttpException_1.default(400, 'Dự án này không tồn tại');
        }
        return project;
    });
}
exports.getInfoProjectService = getInfoProjectService;
function getProjectMemberService(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const project = yield model_1.default.findById(projectId).select('members');
        if (!project) {
            throw new HttpException_1.default(400, 'Dự án này không tồn tại');
        }
        return project.members;
    });
}
exports.getProjectMemberService = getProjectMemberService;
//# sourceMappingURL=getService.js.map
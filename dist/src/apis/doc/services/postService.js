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
exports.createDocService = void 0;
const HttpException_1 = __importDefault(require("../../../common/helpers/HttpException"));
const model_1 = __importDefault(require("../../../models/doc/model"));
const model_2 = __importDefault(require("../../../models/project/information/model"));
function createDocService(request, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield model_2.default.findById(projectId);
        if (!user) {
            throw new HttpException_1.default(400, 'Tài khoản của bạn không tồn tại');
        }
        const newDoc = new model_1.default({
            projectId: projectId,
            description: request.description,
            host: request.host,
            endpoint: request.endpoint,
            method: request.method,
            title: request.title,
            members: request.members,
            requestType: request.requestType,
            requestBody: request.requestBody,
            responseType: request.requestType,
            responseBody: request.requestBody,
        });
        const project = yield newDoc.save();
        // await projectModel.findByIdAndUpdate(request.projectId, {
        //   $push: { unit: { unit_id: project._id, name: project.title } },
        // });
        return project;
    });
}
exports.createDocService = createDocService;
//# sourceMappingURL=postService.js.map
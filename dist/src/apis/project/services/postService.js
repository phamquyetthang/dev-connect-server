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
exports.createProjectService = void 0;
const HttpException_1 = __importDefault(require("../../../common/helpers/HttpException"));
const model_1 = __importDefault(require("../../../models/user/account/model"));
const model_2 = __importDefault(require("../../../models/project/information/model"));
function createProjectService(request, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield model_1.default.findById(userId);
        if (!user) {
            throw new HttpException_1.default(400, 'Tài khoản của bạn không tồn tại');
        }
        const newProject = new model_2.default({
            name: request.name,
            originator: {
                id: user.id,
                name: `${user.first_name} ${user.last_name}`,
            },
            description: request.description,
            readme: request.readme,
            members: [
                {
                    member_id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    position: '',
                },
            ],
        });
        const project = yield newProject.save();
        return project;
    });
}
exports.createProjectService = createProjectService;
//# sourceMappingURL=postService.js.map
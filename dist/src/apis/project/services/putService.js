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
exports.addMemberService = void 0;
const HttpException_1 = __importDefault(require("../../../common/helpers/HttpException"));
const model_1 = __importDefault(require("../../../models/project/information/model"));
const model_2 = __importDefault(require("../../../models/user/account/model"));
function addMemberService(email, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const member = yield model_2.default.findOne({ email: email });
        if (!member) {
            throw new HttpException_1.default(400, 'Người dùng này không tồn tại');
        }
        try {
            const project = yield model_1.default.findByIdAndUpdate(projectId, {
                $push: {
                    members: {
                        member_id: member._id,
                        name: `${member.first_name} ${member.last_name}`,
                        position: 'test',
                    },
                },
            }, { new: true });
            if (project) {
                return project.members;
            }
        }
        catch (error) {
            throw new HttpException_1.default(401, 'error');
        }
    });
}
exports.addMemberService = addMemberService;
//# sourceMappingURL=putService.js.map
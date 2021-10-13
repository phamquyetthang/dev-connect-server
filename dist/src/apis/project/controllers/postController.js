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
exports.createProjectController = void 0;
const joi_1 = __importDefault(require("joi"));
const validate_1 = require("../../../common/helpers/validate");
const postService_1 = require("../services/postService");
function createProjectController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        const request = req.body;
        const reqSchema = joi_1.default.object({
            name: joi_1.default.string().min(1).required(),
            description: joi_1.default.string().required(),
            readme: joi_1.default.string().required(),
        });
        try {
            const data = yield validate_1.validateRequest(reqSchema, request);
            const response = yield postService_1.createProjectService(data, userId);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createProjectController = createProjectController;
//# sourceMappingURL=postController.js.map
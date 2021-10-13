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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../../../common/helpers/HttpException"));
const model_1 = __importDefault(require("../../../models/user/account/model"));
const registerService = (model) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.default.findOne({ email: model.email });
    if (user) {
        throw new HttpException_1.default(409, `Your email ${model.email} already exist.`);
    }
    else {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(model.password, salt);
        const createdUser = yield model_1.default.create(Object.assign(Object.assign({}, model), { password: hashedPassword }));
        return {
            token: jsonwebtoken_1.default.sign({ id: createdUser._id }, '123'),
        };
    }
});
exports.default = registerService;
//# sourceMappingURL=register.js.map
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
exports.forgotPasswordService = exports.signInService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = __importDefault(require("../../../models/user/account/model"));
const HttpException_1 = __importDefault(require("../../../common/helpers/HttpException"));
const SendEmail_1 = __importDefault(require("../../../common/helpers/SendEmail"));
const signInService = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.default.findOne({ email: email });
    if (!user) {
        throw new HttpException_1.default(409, `Email is not exist!`);
    }
    else {
        const isMatchPass = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatchPass)
            throw new HttpException_1.default(400, 'Wrong password');
        else {
            return {
                token: jsonwebtoken_1.default.sign({
                    id: user._id,
                }, '123'),
            };
        }
    }
});
exports.signInService = signInService;
const forgotPasswordService = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.default.findOne({ email: email });
    if (!user) {
        throw new HttpException_1.default(409, `Email is not exist!`);
    }
    else {
        try {
            const newPass = Math.random().toString(36).slice(2);
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(newPass, salt);
            user.password = hashedPassword;
            yield SendEmail_1.default(email, `Mật khẩu mới của bạn là  ${newPass}`);
            yield user.save();
            return { data: 'success' };
        }
        catch (error) {
            throw new HttpException_1.default(409, `Lấy lại mật khẩu thất bại`);
        }
    }
});
exports.forgotPasswordService = forgotPasswordService;
//# sourceMappingURL=index.js.map
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
exports.forgotPasswordController = exports.signInController = void 0;
const services_1 = require("../services");
const signInController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const response = yield services_1.signInService({ email, password });
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.signInController = signInController;
const forgotPasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const response = yield services_1.forgotPasswordService({ email });
        res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPasswordController = forgotPasswordController;
//# sourceMappingURL=index.js.map
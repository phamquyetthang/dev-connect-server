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
exports.addMemberController = void 0;
const putService_1 = require("../services/putService");
function addMemberController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, projectId } = req.body;
            const response = yield putService_1.addMemberService(email, projectId);
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.addMemberController = addMemberController;
//# sourceMappingURL=putController.js.map
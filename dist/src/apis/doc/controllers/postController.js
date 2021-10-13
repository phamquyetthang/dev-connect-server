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
exports.createDocController = void 0;
const postService_1 = require("../services/postService");
function createDocController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { docData, projectId, } = req.body;
            const response = yield postService_1.createDocService(docData, projectId);
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createDocController = createDocController;
//# sourceMappingURL=postController.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../helpers/Logger"));
const errorMiddleware = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'some error';
    Logger_1.default.error(`[ERROR]: status: ${status}, mess : ${message}`);
    res.status(status).json({
        message: message,
    });
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorHandlers.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const HttpException_1 = __importDefault(require("./HttpException"));
function validateRequest(schema, request) {
    const { error, value } = schema.validate(request);
    if (error) {
        throw new HttpException_1.default(422, `validate error: ${error.message}`);
    }
    return value;
}
exports.validateRequest = validateRequest;
//# sourceMappingURL=validate.js.map
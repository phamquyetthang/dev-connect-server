"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const permissionsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        enum: ['READ', 'EDIT', 'CREATE', 'DELETE'],
        require: true,
    },
});
exports.default = mongoose_1.default.model('Permissions', permissionsSchema);
//# sourceMappingURL=model.js.map
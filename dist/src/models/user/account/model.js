"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    project_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Projects',
    },
    position: {
        type: String,
    },
    permissions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Admin-permissions',
        },
    ], // permissions phai chi theo tung doc (trong moi use là admin permissions)
}, { timestamps: { createdAt: true } });
const userModel = mongoose_1.default.model('Accounts', userSchema);
exports.default = userModel;
//# sourceMappingURL=model.js.map
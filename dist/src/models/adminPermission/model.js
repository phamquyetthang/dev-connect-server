"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminPermissionsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    permission: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Permissions'
        }]
});
exports.default = mongoose_1.default.model('Admin-permissions', adminPermissionsSchema);
//# sourceMappingURL=model.js.map
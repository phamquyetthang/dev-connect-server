"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const functionSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    members: [
        {
            member: {
                type: Schema.Types.ObjectId,
                ref: 'Accounts',
                require: true,
                unique: true,
            },
            name: {
                type: String,
                require: true,
            },
            position: {
                type: String,
                require: true,
            },
        },
    ],
    docs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Docs',
        },
    ],
});
exports.default = mongoose_1.default.model('Functions', functionSchema);
//# sourceMappingURL=model.js.map
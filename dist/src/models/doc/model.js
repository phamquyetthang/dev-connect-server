"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docStatusModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const docStatusSchema = new Schema({
    name: {
        type: String,
    },
    code: {
        type: Number,
    },
    description: {
        type: String,
    },
});
exports.docStatusModel = mongoose_1.default.model('DocStatus', docStatusSchema);
const docSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Projects',
    },
    title: {
        type: String,
        require: true,
    },
    method: {
        type: String,
        require: true,
        enum: [
            'GET',
            'HEAD',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'CONNECT',
            'OPTIONS',
            'TRACE',
        ],
    },
    host: String,
    endpoint: {
        type: String,
        require: true,
    },
    requestType: {
        type: String,
        require: true,
    },
    requestBody: Object,
    responseType: {
        type: String,
        require: true,
    },
    responseBody: Object,
    status: [{
            type: Schema.Types.ObjectId,
            ref: 'DocStatus'
        }],
    description: {
        type: String,
        require: true,
    },
    members: [
        {
            _id: false,
            id_member: {
                type: Schema.Types.ObjectId,
                ref: 'Accounts',
            },
            name: {
                type: String,
                require: true,
            },
        },
    ],
    extension: {
        type: String,
    },
});
const docModel = mongoose_1.default.model('Docs', docSchema);
exports.default = docModel;
//# sourceMappingURL=model.js.map
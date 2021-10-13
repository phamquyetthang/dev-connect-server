"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    originator: {
        id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Accounts' },
        name: String,
    },
    members: [
        {
            _id: false,
            member_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                require: true,
            },
            name: {
                type: String,
                require: true,
            },
            position: {
                type: String,
                require: true,
            },
            // indexedDB: true,
        },
    ],
    description: {
        type: String,
        require: true,
    },
    readme: {
        type: String,
    },
    files: [
        {
            title: String,
            file: String,
        },
    ],
    links: [
        {
            title: String,
            link: String,
        },
    ],
    units: [
        {
            unit_id: mongoose_1.Schema.Types.ObjectId,
            name: String,
        },
    ],
}, { timestamps: { createdAt: true } });
const projectModel = mongoose_1.model('Projects', projectSchema);
exports.default = projectModel;
//# sourceMappingURL=model.js.map
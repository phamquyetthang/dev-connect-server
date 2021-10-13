"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Accounts",
    },
    company: {
        type: {
            type: String,
        },
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
            },
            company: {
                type: String,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: { type: Date, required: true },
            current: { type: Boolean, default: false },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
            },
            degree: {
                type: String,
            },
            fieldOfStudy: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: { type: Date, required: true },
            current: { type: Boolean, default: false },
            description: {
                type: String,
            },
        },
    ],
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        zalo: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
    followings: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Accounts",
            },
        },
    ],
    followers: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Accounts",
            },
        },
    ],
    friends: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Accounts',
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    friend_requests: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Accounts',
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
exports.default = mongoose_1.default.model("Profiles", profileSchema);
//# sourceMappingURL=model.js.map
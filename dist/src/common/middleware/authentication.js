"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Bắt token
const authMiddleware = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ message: "No token, authorization deneid." });
    }
    else {
        try {
            const user = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET || "123");
            if (!req.user)
                req.user = { id: "" };
            req.user.id = user.id;
            next();
        }
        catch (error) {
            console.log("🚀 ~ file: authentication.ts ~ line 19 ~ authMiddleware ~ error", error);
            return res.status(401).json({ message: "Token is not valid" });
        }
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=authentication.js.map
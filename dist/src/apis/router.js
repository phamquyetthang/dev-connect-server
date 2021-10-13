"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./auth/router"));
const router_2 = __importDefault(require("./doc/router"));
const router_3 = __importDefault(require("./project/router"));
const router_4 = __importDefault(require("./user/router"));
const rootRouter = [router_1.default, router_4.default, router_3.default, router_2.default];
exports.default = rootRouter;
//# sourceMappingURL=router.js.map
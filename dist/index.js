"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./src/apis/router"));
const Logger_1 = __importDefault(require("./src/common/helpers/Logger"));
const errorHandlers_1 = __importDefault(require("./src/common/middleware/errorHandlers"));
// import { expressValidator } from './src/apis/user/validator/register';
const app = express_1.default();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use(cors_1.default({ origin: true, credentials: true }));
// app.use(expressValidator())
app.get('/', function (req, res) {
    res.send({ hello: 'HELLO WORLD!' });
});
// router
router_1.default.forEach((route) => {
    app.use('/', route);
});
app.use(errorHandlers_1.default);
const connectString = process.env.MONGODB_URI;
if (!connectString) {
    Logger_1.default.error('connectString invalid');
}
else {
    mongoose_1.default
        .connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(() => Logger_1.default.info('Database connect successfully! '))
        .catch((err) => Logger_1.default.error(err));
}
app.listen(PORT, function () {
    console.info(`server is running on port: ${PORT}`);
});
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidator = exports.emailValidator = exports.loginValidator = exports.registerValidator = exports.expressValidator = void 0;
const express_validator_1 = require("express-validator");
const expressValidator = (req) => {
    const errors = express_validator_1.validationResult(req);
    const messages = [];
    if (!errors.isEmpty()) {
        for (const i of errors.array()) {
            messages.push(i);
        }
    }
    return messages;
};
exports.expressValidator = expressValidator;
const registerValidator = () => [
    express_validator_1.check('email').isEmpty().withMessage('email is required'),
    express_validator_1.check('email').isEmail().withMessage('email is not valid'),
    express_validator_1.check('password').isEmpty().withMessage('password is required'),
    express_validator_1.check('password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters'),
];
exports.registerValidator = registerValidator;
const loginValidator = () => [
    express_validator_1.check('email').notEmpty().withMessage('email is required'),
    express_validator_1.check('email').isEmail().withMessage('email is not valid'),
    express_validator_1.check('password').notEmpty().withMessage('pasword is required'),
];
exports.loginValidator = loginValidator;
const emailValidator = () => [
    express_validator_1.check('email').notEmpty().withMessage('email is required'),
    express_validator_1.check('email').isEmail().withMessage('email is not valid'),
];
exports.emailValidator = emailValidator;
const tokenValidator = () => [
    express_validator_1.check('id').notEmpty().withMessage('token is required'),
    express_validator_1.check('id').isBase64().withMessage('token is not valid'),
];
exports.tokenValidator = tokenValidator;
//# sourceMappingURL=register.js.map
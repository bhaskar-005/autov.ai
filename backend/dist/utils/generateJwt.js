"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genereateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const genereateJwtToken = (data) => {
    const jwtToken = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "12h" });
    return jwtToken;
};
exports.genereateJwtToken = genereateJwtToken;

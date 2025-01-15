"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const responseFormate_1 = require("../utils/responseFormate");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../utils/db"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth_token = req.header('Authorization') || req.cookies.auth_token;
    try {
        const decode = jsonwebtoken_1.default.verify(auth_token, process.env.JWT_SECRET_KEY);
        console.log(decode);
        const isUserExists = yield db_1.default.user.findUnique({
            where: {
                id: decode.id,
            }
        });
        if (!isUserExists) {
            return responseFormate_1.response.error(res, 'user not exists', 404);
        }
        //@ts-ignore
        req.userId = decode.id;
        //@ts-ignore
        req.email = decode.email;
        next();
    }
    catch (error) {
        console.log(error);
        responseFormate_1.response.error(res, 'you are not authenticated', 401, { error });
    }
});
exports.authMiddleware = authMiddleware;

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
exports.loginController = void 0;
const responseFormate_1 = require("../../utils/responseFormate");
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../../utils/db"));
const generateJwt_1 = require("../../utils/generateJwt");
const useragent_1 = __importDefault(require("useragent"));
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    console.log(code);
    try {
        if (!code) {
            return responseFormate_1.response.error(res, "Code not found", 422);
        }
        const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${code}`;
        const googleResponse = yield axios_1.default.get(googleVerifyUrl, {
            responseType: "json",
        });
        console.log(googleResponse);
        let isUserExists = yield db_1.default.user.findFirst({
            where: {
                email: googleResponse.data.email
            }
        });
        //device info with ip
        const agent = useragent_1.default.parse(req.headers['user-agent'] || "");
        const device = `${agent.os} - ${agent.toAgent()}`;
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if (!isUserExists) {
            isUserExists = yield db_1.default.user.create({
                data: {
                    email: googleResponse.data.email,
                    username: googleResponse.data.name,
                    avatar: googleResponse.data.picture || `https://ui-avatars.com/api/?name=${googleResponse.data.name}`
                }
            });
        }
        yield db_1.default.loginActivity.create({
            data: {
                userId: isUserExists.id,
                ip: ipAddress === null || ipAddress === void 0 ? void 0 : ipAddress.toString(),
                device: device
            }
        });
        const payload = {
            id: isUserExists.id,
            email: isUserExists.email
        };
        const token = (0, generateJwt_1.genereateJwtToken)(payload);
        res.cookie("auth_token", token, { httpOnly: true, maxAge: 3600000 });
        return responseFormate_1.response.message(res, "sign up successfull.", 200, { token, user: isUserExists });
    }
    catch (error) {
        console.log(error);
        return responseFormate_1.response.error(res, "failed to login/signup", 403, { error });
    }
});
exports.loginController = loginController;

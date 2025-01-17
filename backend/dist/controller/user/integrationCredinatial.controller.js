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
exports.saveYoutubeCredentials = void 0;
const responseFormate_1 = require("../../utils/responseFormate");
const db_1 = __importDefault(require("../../utils/db"));
const saveYoutubeCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { access_token, refresh_token, token_expiry_date, channel_name, channel_customurl, channel_logo } = req.body;
    //@ts-ignore
    const userId = req.userId;
    //TODO check for if the token is expired then refresh it
    const isChannelAlreadyExists = yield db_1.default.youtubeCredential.findFirst({
        where: {
            userId: userId,
            channelCustomUrl: channel_customurl
        }
    });
    if (isChannelAlreadyExists) {
        return responseFormate_1.response.error(res, "channel already exists", 403);
    }
    const findDefaultNameSpace = yield db_1.default.socialAccountGroup.findFirst({
        where: {
            groupName: "default",
            userId: userId
        }
    });
    try {
        const saveCred = yield db_1.default.youtubeCredential.create({
            data: {
                userId: userId,
                groupId: Math.floor(findDefaultNameSpace === null || findDefaultNameSpace === void 0 ? void 0 : findDefaultNameSpace.id),
                channelName: channel_name,
                channelCustomUrl: channel_customurl,
                channelLogo: channel_logo,
                accessToken: access_token,
                refreshToken: refresh_token,
                accessTokenExpiry: token_expiry_date
            }
        });
        console.log(saveCred);
        return responseFormate_1.response.message(res, "credential saved successfully", 200);
    }
    catch (error) {
        console.log(error);
        return responseFormate_1.response.error(res, 'error while saving you credential', 434);
    }
});
exports.saveYoutubeCredentials = saveYoutubeCredentials;

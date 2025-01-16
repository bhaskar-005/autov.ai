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
exports.deleteNameSpace = exports.updateNameSpace = exports.createNameSpace = exports.getNameSpace = void 0;
const responseFormate_1 = require("../../utils/responseFormate");
const db_1 = __importDefault(require("../../utils/db"));
const getNameSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.params.page) || 1;
    const limit = 10;
    //@ts-ignore
    const userId = req.userId;
    console.log(userId, page);
    const skip = (page - 1) * limit;
    try {
        const totalNameSpace = yield db_1.default.socialAccountGroup.count({
            where: {
                userId
            }
        });
        const nameSpaceData = yield db_1.default.socialAccountGroup.findMany({
            where: {
                userId
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            }
        });
        return responseFormate_1.response.message(res, "name space found.", 200, { nameSpaceData, totalNameSpace });
    }
    catch (error) {
        console.log(error);
        return responseFormate_1.response.error(res, 'Failed to get name space', 403, error);
    }
});
exports.getNameSpace = getNameSpace;
const createNameSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const { nameSpaceTitle, nameSpaceDescription } = req.body;
    if (!nameSpaceTitle) {
        return responseFormate_1.response.error(res, "missing data.", 422);
    }
    try {
        const nameSpace = yield db_1.default.socialAccountGroup.create({
            data: {
                userId,
                groupName: nameSpaceTitle,
                groupDescription: nameSpaceDescription
            }
        });
        return responseFormate_1.response.message(res, "name space created successfully", 200, { nameSpace });
    }
    catch (error) {
        console.log(error);
        return responseFormate_1.response.error(res, "error while creating name space", 404, error);
    }
});
exports.createNameSpace = createNameSpace;
const updateNameSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    const { nameSpaceTitle, nameSpaceDescription } = req.body;
    //@ts-ignore
    const userId = req.userId;
    try {
        if (!nameSpaceTitle || !nameSpaceDescription) {
            return responseFormate_1.response.error(res, "missing data.", 422);
        }
        const nameSpace = yield db_1.default.socialAccountGroup.update({
            where: {
                id: parseInt(groupId),
                userId
            },
            data: {
                groupName: nameSpaceTitle,
                groupDescription: nameSpaceDescription
            }
        });
        return responseFormate_1.response.message(res, "name space updated successfully", 200, { nameSpace });
    }
    catch (error) {
        return responseFormate_1.response.error(res, "error while updating name space", 400);
    }
});
exports.updateNameSpace = updateNameSpace;
const deleteNameSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    //@ts-ignore
    const userId = req.userId;
    try {
        const deleteNameSpace = yield db_1.default.socialAccountGroup.delete({
            where: {
                id: parseInt(groupId),
                userId
            }
        });
        return responseFormate_1.response.message(res, 'name Space deleted successfully.', 200, { deleteNameSpace });
    }
    catch (error) {
        console.log(error);
        return responseFormate_1.response.error(res, "error while deleting name space", 400, { error });
    }
});
exports.deleteNameSpace = deleteNameSpace;

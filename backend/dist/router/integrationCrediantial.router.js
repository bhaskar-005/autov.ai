"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const integrationCredinatial_controller_1 = require("../controller/user/integrationCredinatial.controller");
const router = (0, express_1.Router)();
router.post("/save/youtube", authMiddleware_1.authMiddleware, integrationCredinatial_controller_1.saveYoutubeCredentials);
exports.default = router;

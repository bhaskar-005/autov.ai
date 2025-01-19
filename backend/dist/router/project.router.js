"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const project_controller_1 = require("../controller/user/project.controller");
const router = (0, express_1.Router)();
router.post('/create-project', authMiddleware_1.authMiddleware, project_controller_1.CreateProject);
router.get('/get-project/:page', authMiddleware_1.authMiddleware, project_controller_1.GetProjects);
exports.default = router;

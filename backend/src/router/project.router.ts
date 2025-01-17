import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { CreateProject, GetProjects } from "../controller/user/project.controller";

const router = Router();
router.post('/create-project',authMiddleware, CreateProject);
router.get('/get-project/:page',authMiddleware, GetProjects);

export default router;
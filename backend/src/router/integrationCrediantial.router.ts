import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { saveYoutubeCredentials } from "../controller/user/integrationCredinatial.controller";

const router = Router();

router.post("/save/youtube", authMiddleware, saveYoutubeCredentials );

export default router;
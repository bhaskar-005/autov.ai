import { Router } from "express";
import { loginController } from "../controller/user/login.controller";

const router = Router();

router.post("/login", loginController);
router.get("/getTestJwt/:userId")
export default router;
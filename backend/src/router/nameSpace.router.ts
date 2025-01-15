import { Router } from "express";
import { createNameSpace, deleteNameSpace, getNameSpace, updateNameSpace } from "../controller/user/name-space.controller";
import { authMiddleware } from "../middleware/authMiddleware";



const router = Router();

router.get('/get-name-space/:page', authMiddleware, getNameSpace );
router.post("/create-name-space", authMiddleware , createNameSpace);
router.delete("/delete-name-space/:groupId", authMiddleware, deleteNameSpace);
router.put("/update-name-space/:groupId", authMiddleware, updateNameSpace);

export default router;
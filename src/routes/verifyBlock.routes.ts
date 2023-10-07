import { Router } from "express";
import { verifyBlock } from "../controllers/verifyBlock.controller"
import verifyToken from "../middleware/auth";
const router = Router();

router.post("/", verifyToken, verifyBlock);

export default router;

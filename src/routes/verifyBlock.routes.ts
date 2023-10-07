import { Router } from "express";
import { verifyBlock } from "../controllers/verifyBlock.controller"
const router = Router();

router.post("/", verifyBlock);

export default router;

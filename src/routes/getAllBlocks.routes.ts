import verifyToken from "src/middleware/auth";
import { getAllBlocksController } from "../controllers/getAllBlocks.controllers";
import { Router } from "express";
const router = Router();

router.get("/", verifyToken, getAllBlocksController)

export default router;
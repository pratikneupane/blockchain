import verifyToken from "../middleware/auth";
import { getAllBlocksController } from "../controllers/fiDashboard.controller";
import { Router } from "express";
const router = Router();

router.get("/", verifyToken, getAllBlocksController)

export default router;
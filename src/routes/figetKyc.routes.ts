import { Router } from "express";
import { getkycController } from "../controllers/figetkyc.controllers";
import verifyToken from "../middleware/auth";
const router = Router();

router.post("/", verifyToken, getkycController);

export default router;

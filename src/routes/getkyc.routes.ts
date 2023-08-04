import { Router } from "express";
import { getkycController } from "../controllers/getkyc.controllers";
import verifyToken from "../middleware/auth";
const router = Router();

router.get("/", verifyToken, getkycController);

export default router;

import { Router } from "express";
import { profileController } from "../controllers/profile.controllers";
import verifyToken from "../middleware/auth";
const router = Router();

router.get("/", verifyToken, profileController);

export default router;

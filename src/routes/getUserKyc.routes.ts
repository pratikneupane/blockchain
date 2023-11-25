import { Router } from "express";
import verifyToken from "../middleware/auth";
import { getUserKycController } from "../controllers/getUserKycDetails.controllers";
const router = Router();

router.post("/", verifyToken, getUserKycController);

export default router;

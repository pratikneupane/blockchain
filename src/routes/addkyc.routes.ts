import { Router } from "express";
import { addKycController } from "../controllers/addkyc.controllers";
import verifyToken from "../middleware/auth";
const router = Router();

router.post("/", verifyToken, addKycController);

export default router;

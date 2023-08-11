import { Router } from "express";
import { addKycController } from "../controllers/addkyc.controllers";
import verifyToken from "../middleware/auth";
import auth from "../middleware/auth";
const router = Router();

router.post("/", auth, addKycController);

export default router;

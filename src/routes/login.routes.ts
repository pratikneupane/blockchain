import { Router } from "express";
import { verifyUser } from "../controllers/login.controllers";
const router = Router();

router.post("/", verifyUser);

export default router;

import { Router } from "express";
import { registerUser } from "../controllers/signup.controller";
const router = Router();

router.post("/", registerUser);

export default router;

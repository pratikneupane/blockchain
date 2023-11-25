import { Router } from "express";
import { verifyUser } from "../controllers/fiLogin.controllers";
const router = Router();

router.post("/", verifyUser);

export default router;

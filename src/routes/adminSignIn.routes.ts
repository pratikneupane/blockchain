import { Router } from "express";
import { verifyAdmin } from "../controllers/adminSignin.controller";
const router = Router();

router.post("/", verifyAdmin);

export default router;

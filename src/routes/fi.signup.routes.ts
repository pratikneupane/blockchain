import { Router } from "express";
import { registerFinancialInstitution } from "../controllers/fiSignUp.controller";
const router = Router();

router.post("/", registerFinancialInstitution);

export default router;

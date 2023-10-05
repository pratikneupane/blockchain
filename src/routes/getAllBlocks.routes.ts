import { getAllBlocksController } from "../controllers/getAllBlocks.controllers";
import { Router } from "express";
const router = Router();

router.get("/", getAllBlocksController)

export default router;
import { Router } from "express";

const router = Router();

import generation from "./generation/generationRoutes.js";
router.use("/generation", generation);

//Other Path for users

export default router;

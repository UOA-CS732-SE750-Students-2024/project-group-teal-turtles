import { Router } from "express";

const router = Router();

import generation from "./generation/generationRoutes.js";
router.use("/generation", generation);

import userRoutes from "./api-users.js";
router.use("/users", userRoutes);

export default router;

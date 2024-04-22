import { Router } from "express";

const router = Router();

import userRoutes from "./api-users.js";
router.use("/users", userRoutes);

export default router;

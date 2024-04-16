import { Router } from "express";

const router = Router();

import userRoutes from "./api-users.js"
router.use("/users", userRoutes);
// router.get("/", function (req, res) {
//   res.send("Hello World");
// });

export default router;

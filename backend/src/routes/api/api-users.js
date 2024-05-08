import { Router } from "express";
import { createUser, retrieveUser, deleteUser } from "../../data/user-dao.js";

const router = Router();

/*
 * GET /api/users
 * retrieves a user object using the authtoken in the header
 */
router.get("/", async (req, res) => {
	try {
		const user = await retrieveUser(req.uid);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		return res.json(user);
	} catch (err) {
		return res.status(500).json({ error: "Internal server error" });
	}
});

router.post("/", async (req, res) => {
	try {
		const user = await createUser(req.uid);
		return res.status(201).json(user);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

router.delete("/", async (req, res) => {
	try {
		await deleteUser(req.uid);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

import mealRoutes from "./users/users-meals.js";
router.use("/meals", mealRoutes);

import ingredientRoutes from "./users/users-ingredients.js";
router.use("/ingredients", ingredientRoutes);

import parameterRoutes from "./users/users-parameters.js";
router.use("/parameters", parameterRoutes);

export default router;

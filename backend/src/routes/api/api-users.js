import { Router } from "express";
import { createUser, retrieveUser, deleteUser } from "../../data/user-dao.js";

const router = Router();

/*
 * GET /api/users
 * retrieves a user object using the authtoken in the header
 */
router.get("/", async (req, res) => {
	const user = await retrieveUser(req.uid);

	if (user) return res.json(user);
	return res.sendStatus(404);
});

/*
 * POST /api/users
 * creates a new user in MongoDB using the authToken in the header
 */
router.post("/", async (req, res) => {
	try {
		const user = await createUser(req.uid);
		return res.status(201).json(user);
	} catch (err) {
		if (err.status === 409) {
			return res.json(err);
		} else {
			return res.status(422).json(err);
		}
	}
});

/*
 * DELETE /api/users
 * deletes a user account thats auth token is in the header
 */
router.delete("/", async (req, res) => {
	await deleteUser(req.uid);
	return res.sendStatus(204);
});

import mealRoutes from "./users/users-meals.js";
router.use("/meals", mealRoutes);

import ingredientRoutes from "./users/users-ingredients.js";
router.use("/ingredients", ingredientRoutes);

import parameterRoutes from "./users/users-parameters.js";
router.use("/paramters", parameterRoutes);

export default router;

import { Router } from "express";
import { createUser, retrieveUser, deleteUser } from "../../data/user-dao.js";

const router = Router();

/*
 * GET /api/users/:uid
 * retrieves a user
 *
 * Path parameters:
 * - uid (string): The ID of the user to be retrieved
 */
router.get("/:uid", async (req, res) => {
	const { uid } = req.params;

	const user = await retrieveUser(uid);

	if (user) return res.json(user);
	return res.sendStatus(404);
});

/*
 * POST /api/users
 * creates a new user in MongoDB
 *
 * Body JSON input:
 * - uid (string): The ID of the user to create which would have first been retrieved from firebase authentication
 */
router.post("/", async (req, res) => {
	try {
		const { uid } = req.body;
		const user = await createUser(uid);
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
 * DELETE /api/users/:uid
 * deletes a user account
 *
 * Path parameters:
 * - uid (string): The ID of the user to be deleted
 */
router.delete("/:uid", async (req, res) => {
	const { uid } = req.params;
	await deleteUser(uid);
	return res.sendStatus(204);
});

import mealRoutes from "./users/users-meals.js";
router.use("/:uid/meals", mealRoutes);

import ingredientRoutes from "./users/users-ingredients.js";
router.use("/:uid/ingredients", ingredientRoutes);

import parameterRoutes from "./users/users-parameters.js";
router.use("/:uid/paramters", parameterRoutes);

export default router;

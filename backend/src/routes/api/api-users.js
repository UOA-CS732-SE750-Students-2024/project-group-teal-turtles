import { Router } from "express";
import {
	createUser,
	addFavouriteMeal,
	deleteFavouriteMeal,
	addGeneratedMeal,
	setPantry,
	setDislikedIngredientsList,
	addDislikedIngredient,
	setUserParameters,
	deleteUser
} from "../../data/user-dao.js";

const router = Router();

// Retrieve single user
router.get("/:uid", async (req, res) => {
	const { uid } = req.params;

	const user = await retrieveUser(uid);

	if (user) return res.json(user);
	return res.sendStatus(404);
});

router.post("/", async (req, res) => {
	try {
		const { uid } = req.body;
		const user = await createUser(uid);
		return res.status(201).location(`/api/users/${todo._id}`).json(user);
	} catch (err) {
		return res.status(422).json(err);
	}
});

router.delete("/:id", async (req, res) => {
	const { uid } = req.params;
	await deleteUser(uid);
	return res.sendStatus(204);
});

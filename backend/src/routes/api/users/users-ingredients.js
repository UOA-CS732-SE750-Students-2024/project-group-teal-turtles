import { Router } from "express";
import {
	getIngredients,
	setIngredientTypeList,
	setIngredients,
	removeDislikedIngredient,
	addDislikedIngredient,
	getDislikedIngredients
} from "../../../data/user-dao.js";

const router = Router();

/*
 * PUT /api/users/ingredients
 * sets ingredients of a user
 *
 * Body JSON example:
 *{
 * "ingredients": [Tomato, Spinach, Broccoli]
 * }
 */
router.put("/", async (req, res) => {
	try {
		const { ingredients } = req.body;
		if (!ingredients) {
			return res.status(400).json({ error: "ingredients to set is missing" });
		}
		await setIngredients(req.uid, ingredients);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

/*
 * GET /api/users/ingredients
 * retrieves all the users ingredients
 */
router.get("/", async (req, res) => {
	try {
		const ingredients = await getIngredients(req.uid);
		return res.json(ingredients);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

/*
 * PUT /api/users/ingredients/disliked/add
 * Add one disliked ingredient for a user
 *
 * Body JSON example:
 * {
 * "dislikedIngredient": "Olives"
 * }
 */
router.put("/disliked/add", async (req, res) => {
	try {
		const { dislikedIngredientToAdd } = req.body;
		if (!dislikedIngredientToAdd) {
			return res.status(400).json({ error: "dislikedIngredient to add is missing" });
		}
		await addDislikedIngredient(req.uid, dislikedIngredientToAdd);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});
/*
 * PUT /api/users/ingredients/disliked/remove
 * Remove one disliked ingredient for a user
 *
 * Body JSON example:
 * {
 * "dislikedIngredient": "Olives"
 * }
 */
router.put("/disliked/remove", async (req, res) => {
	try {
		const { dislikedIngredientToRemove } = req.body;
		if (!dislikedIngredientToRemove) {
			return res.status(400).json({ error: "dislikedIngredient to remove is missing" });
		}
		await removeDislikedIngredient(req.uid, dislikedIngredientToRemove);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

/*
 * GET /api/users/ingredients/disliked
 * Retrieve all disliked ingredients for a certain user
 */
router.get("/disliked", async (req, res) => {
	try {
		const dislikedIngredients = await getDislikedIngredients(req.uid);
		res.json(dislikedIngredients);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

export default router;

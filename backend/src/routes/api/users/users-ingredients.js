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
 * PUT /api/users/:uid/ingredients
 * sets ingredients of a user
 *
 * Body JSON input:
 * - ingredients(object containing list of strings for each ingredient type) : all the ingredients
 */
router.put("/", async (req, res) => {
	try {
		const { uid } = req.params;
		const { ingredients } = req.body;

		await setIngredients(uid, ingredients);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(422).json(err);
	}
});

/*
 * PUT /api/users/:uid/ingredients/type
 * Set ingredient list of a certain type for a user
 *
 * Body JSON inputs:
 * - ingredientType(String): type of ingredient that want to make changes to its list
 * - ingredients(object containing list of strings for each ingredient type) : all the ingredients
 */
router.put("/type", async (req, res) => {
	try {
		const { uid } = req.params;
		const { ingredientType, ingredients } = req.body;

		await setIngredientTypeList(uid, ingredientType, ingredients);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(422).json(err);
	}
});
/*
 * GET /api/users/:uid/ingredients
 * retrieves all the users ingredients
 */
router.get("/", async (req, res) => {
	const { uid } = req.params;

	const ingredients = await getIngredients(uid);

	if (ingredients) return res.json(ingredients);
	return res.sendStatus(404).json(err);
});
/*
 * PUT /api/users/:uid/ingredients/favourite/add
 * Add one disliked ingredient for a user
 *
 * Body JSON input:
 * - dislikedIngredient(String): ingredient to be added from disliked list
 */
router.put("/disliked/add", async (req, res) => {
	try {
		const { uid } = req.params;
		const { dislikedIngredient } = req.body;

		await addDislikedIngredient(uid, dislikedIngredient);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(422).json(err);
	}
});
/*
 * PUT /api/users/:uid/ingredients/favourite
 * Remove one disliked ingredient for a user
 *
 * Body JSON input:
 * - dislikedIngredient(String): ingredient to be removed from disliked list
 */
router.put("/disliked/remove", async (req, res) => {
	try {
		const { uid } = req.params;
		const { dislikedIngredient } = req.body;

		await removeDislikedIngredient(uid, dislikedIngredient);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(422).json(err);
	}
});
/*
 * GET /api/users/:uid/ingredients/disliked
 * Retrieve all disliked ingredients for a certain user
 */
router.get("/disliked", async (req, res) => {
	const { uid } = req.params;

	const dislikedIngredients = await getDislikedIngredients(uid);

	if (dislikedIngredients) return res.json(dislikedIngredients);
	return res.sendStatus(404).json(err);
});

export default router;

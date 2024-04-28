import { Router } from "express";
import {
	addFavouriteMeal,
	deleteFavouriteMeal,
	getFavouriteMeals,
	addGeneratedMeal,
	getGeneratedMeals
} from "../../../data/user-dao.js";

const router = Router();

/*
 * PUT /api/users/meals/favourite/add
 * Adds a new favourite meal to the users favourite meals list
 *
 * Body JSON input:
 * - favMealToAdd(String) : the new favourite meal name
 */
router.put("/favourite/add", async (req, res) => {
	try {
		const { favMealToAdd } = req.body;
		await addFavouriteMeal(req.uid, favMealToAdd);
		return res.sendStatus(201);
	} catch (err) {
		return res.status(422).json(err);
	}
});

/*
 * PUT /api/users/meals/favourite/remove
 * Removes a favourite meal from the user's favourite meals list
 *
 * Body JSON input:
 * - favMealToDelete (String) : the favourite meal to be removed from the users favourite meal list
 */
router.put("/favourite", async (req, res) => {
	try {
		const { favMealToDelete } = req.body;
		await deleteFavouriteMeal(req.uid, favMealToDelete);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(422).json(err);
	}
});

/*
 * GET /api/users/meals/favourite
 * retrieves the users favourite meals (String list)
 */
router.get("/favourite", async (req, res) => {
	const favoriteMeals = await getFavouriteMeals(req.uid);

	if (favoriteMeals) return res.json(favoriteMeals);
	return res.sendStatus(404).json(err);
});

/*
 * PUT /api/users/meals
 * adds a new generated meal to the users generated meal list
 *
 * Body JSON input:
 * - mealToAdd(String) : the new generated meal name
 */
router.put("/", async (req, res) => {
	try {
		const { mealToAdd } = req.body;
		await addGeneratedMeal(req.uid, mealToAdd);
		return res.sendStatus(201);
	} catch (err) {
		return res.status(422).json(err);
	}
});

/*
 * GET /api/users/meals/favourite
 * retrieves all the users generated meals (String list)
 */
router.get("/", async (req, res) => {
	const generatedMeals = await getGeneratedMeals(req.uid);

	if (generatedMeals) return res.json(generatedMeals);
	return res.sendStatus(404).json(err);
});

export default router;

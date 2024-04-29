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
 * Body JSON example:
 * {
 * "favMealToAdd": "Chicken Curry"
 * }
 */
router.put("/favourite/add", async (req, res) => {
	try {
		const { favMealToAdd } = req.body;
		if (!favMealToAdd) {
			return res.status(400).json({ error: "favMealToAdd is missing" });
		}
		await addFavouriteMeal(req.uid, favMealToAdd);
		return res.sendStatus(201);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

/*
 * PUT /api/users/meals/favourite/remove
 * Removes a favourite meal from the user's favourite meals list
 *
 * Body JSON example:
 * {
 * "favMealToDelete": "Chicken Curry"
 * }
 */
router.put("/favourite/remove", async (req, res) => {
	try {
		const { favMealToDelete } = req.body;
		if (!favMealToDelete) {
			return res.status(400).json({ error: "favMealToDelete is missing" });
		}
		await deleteFavouriteMeal(req.uid, favMealToDelete);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

/*
 * GET /api/users/meals/favourite
 * retrieves the users favourite meals (String list)
 */
router.get("/favourite", async (req, res) => {
	try {
		const favoriteMeals = await getFavouriteMeals(req.uid);
		return res.json(favoriteMeals);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

/*
 * PUT /api/users/meals
 * adds a new generated meal to the users generated meal list
 *
 * Body JSON example:
 * {
 * "mealToAdd": "Spaghetti Carbonara"
 * }
 */
router.put("/", async (req, res) => {
	try {
		const { mealToAdd } = req.body;
		if (!mealToAdd) {
			return res.status(400).json({ error: "Meal to add is missing" });
		}
		await addGeneratedMeal(req.uid, mealToAdd);
		return res.sendStatus(201);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

/*
 * GET /api/users/meals/
 * retrieves all the users generated meals (String list)
 */
router.get("/", async (req, res) => {
	try {
		const generatedMeals = await getGeneratedMeals(req.uid);
		return res.json(generatedMeals);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

export default router;

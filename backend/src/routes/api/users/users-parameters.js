import { Router } from "express";
import { getParameters, setUserParameters } from "../../../data/user-dao.js";

const router = Router();

/*
 * PUT /api/users/parameters
 * updates the logged in users parameters
 *
 * example request body:
 * {
 * "parameters": {
 *   "numberOfPeople": 4,
 *   "mealType": "dinner",									  (must be "breakfast", "lunch", or "dinner")
 *   "cuisine": "Italian",
 *   "dietaryRequirements": "None"
 * 	}
 * }
 */
router.put("/", async (req, res) => {
	try {
		const { parameters } = req.body;

		const requiredFields = ["numberOfPeople", "mealType", "cuisine", "dietaryRequirements"];
		const missingFields = [];
		if (!parameters) {
			return res.status(400).json({ error: "Missing parameters" });
		}
		for (const field of requiredFields) {
			if (!parameters[field]) {
				missingFields.push(field);
			}
		}
		if (missingFields.length > 0) {
			return res.status(400).json({
				error: `Missing required fields: ${missingFields.join(", ")}`
			});
		}
		if (!["Breakfast", "Lunch", "Dinner"].includes(parameters.mealType)) {
			return res.status(400).json({ error: "mealType must be one of 'breakfast', 'lunch', or 'dinner'" });
		}
		await setUserParameters(req.uid, parameters);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

/*
 * GET /api/users/parameters
 * retrieves the logged in users parameters
 */
router.get("/", async (req, res) => {
	try {
		const parameters = await getParameters(req.uid);
		return res.json(parameters);
	} catch (err) {
		return res.status(err.status).json({ error: err.error });
	}
});

export default router;

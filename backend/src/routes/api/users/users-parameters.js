import { Router } from "express";
import { getParameters, setUserParameters } from "../../../data/user-dao.js";

const router = Router();

/*
 * PUT /api/users/parameters
 * updates the logged in users parameters
 *
 * Body JSON input:
 * - parameters(object with properties as seen in schema.js) : the users new parameters
 */
router.put("/", async (req, res) => {
	try {
		const { parameters } = req.body;

		await setUserParameters(req.uid, parameters);
		return res.sendStatus(204);
	} catch (err) {
		return res.status(422).json(err);
	}
});

/*
 * GET /api/users/parameters
 * retrieves the logged in users parameters
 */
router.get("/", async (req, res) => {
	const parameters = await getParameters(req.uid);

	if (parameters) return res.json(parameters);
	return res.sendStatus(404).json(err);
});

export default router;

import express from "express";

import createAndRun from "../../../openAI/openAi.js";

const basicLoose = express.Router();

basicLoose.get("/", async (req, res) => {
	const ingredients = Object.values(req.body.ingredients).flat();
	req.body.ingredients = ingredients;
	res.send(await createAndRun(process.env.ASSISTANT_BASIC_LOOSE_ID, JSON.stringify(req.body)));
});

export default basicLoose;

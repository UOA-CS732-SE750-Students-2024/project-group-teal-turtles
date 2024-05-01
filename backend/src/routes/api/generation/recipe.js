import express from "express";

import createAndRun from "../../../openAI/openAi.js";
const recipe = express.Router();

recipe.get("/", async (req, res) => {
	res.send(await createAndRun(process.env.ASSISTANT_RECIPE_ID, JSON.stringify(req.body)));
});

export default recipe;

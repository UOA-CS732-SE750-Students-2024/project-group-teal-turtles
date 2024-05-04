import express from "express";

import createAndRun from "../../../openAI/openAi.js";
const recipe = express.Router();

recipe.post("/", async (req, res) => {
	res.send(await createAndRun("asst_utnc7GcTPZmQB6FRtzuoNQCw", JSON.stringify(req.body)));
});

export default recipe;

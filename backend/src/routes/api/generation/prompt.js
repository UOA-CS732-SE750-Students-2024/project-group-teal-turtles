import express from "express";

import createAndRun from "../../../openAI/openAi.js";
const prompt = express.Router();

prompt.post("/", async (req, res) => {
	res.send(await createAndRun("asst_P6mVS6LKOmS1vjerbX4Y99Qu", JSON.stringify(req.body)));
});

export default prompt;

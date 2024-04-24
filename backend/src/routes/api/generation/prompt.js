import express from "express";

import createAndRun from "../../../openAI/openAi.js";
const prompt = express.Router();

prompt.get("/", async (req, res) => {
	res.send(await createAndRun(process.env.ASSISTANT_PROMPT_ID, JSON.stringify(req.body)));
});

export default prompt;

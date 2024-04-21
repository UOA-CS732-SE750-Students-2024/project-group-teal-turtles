import express from "express";

import createAndRun from "../../../openAI/openAi.js";

const basic = express.Router();

basic.get("/", async (req, res) => {
	var body = req.body;
	const levelOfStrictness = "Level of strictness for ingredients: Strict";
	body = body + levelOfStrictness;
	const text = await createAndRun(process.env.ASSISTANT_ID, body);
	res.send(JSON.stringify(text));
});

export default basic;

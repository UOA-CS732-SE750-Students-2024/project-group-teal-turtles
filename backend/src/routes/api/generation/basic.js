import express from "express";

import createAndRun from "../../../openAI/openAi.js";

const basic = express.Router();

basic.get("/", async (req, res) => {
	var body = req.body.string;
	const levelOfStrictness = "Level of strictness for ingredients: Strict";
	body = body + levelOfStrictness;
	console.log(body);
	res.send(JSON.stringify(await createAndRun(process.env.ASSISTANT_ID, body)));
});

export default basic;

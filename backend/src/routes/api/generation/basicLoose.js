import express from "express";

import createAndRun from "../../../openAI/openAi.js";

const basicLoose = express.Router();

basicLoose.get("/", async (req, res) => {
	res.send(await createAndRun(process.env.ASSISTANT_BASIC_LOOSE_ID, JSON.stringify(req.body)));
});

export default basicLoose;

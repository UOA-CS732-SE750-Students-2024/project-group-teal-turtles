import express from "express";

import createAndRun from "../../../openAI/openAi.js";
const remix = express.Router();

remix.get("/", async (req, res) => {
	res.send(await createAndRun(process.env.ASSISTANT_REMIX_ID, JSON.stringify(req.body)));
});

export default remix;

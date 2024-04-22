import express from "express";

import createAndRun from "../../../openAI/openAi.js";

const basicStrict = express.Router();

basicStrict.get("/", async (req, res) => {
	res.send(await createAndRun(process.env.ASSISTANT_BASIC_STRICT_ID, JSON.stringify(req.body)));
});

export default basicStrict;

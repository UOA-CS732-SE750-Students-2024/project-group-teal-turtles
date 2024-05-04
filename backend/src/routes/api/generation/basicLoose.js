import express from "express";

import createAndRun from "../../../openAI/openAi.js";
const basicLoose = express.Router();

basicLoose.post("/", async (req, res) => {
	res.send(await createAndRun("asst_VcVcT36h8rrnjcEjKMASTf9p", JSON.stringify(req.body)));
});

export default basicLoose;

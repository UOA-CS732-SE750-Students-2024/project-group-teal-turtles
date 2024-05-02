import express from "express";

import createAndRun from "../../../openAI/openAi.js";
const basicLoose = express.Router();

basicLoose.get("/", async (req, res) => {
	const ingredients = Object.values(req.body.ingredients).flat();
	req.body.ingredients = ingredients;
	res.send(await createAndRun("asst_VcVcT36h8rrnjcEjKMASTf9p", JSON.stringify(req.body)));
});

export default basicLoose;

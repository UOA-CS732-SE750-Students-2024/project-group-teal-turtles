import express from "express";

import createAndRun from "../../../openAI/openAi.js";

const basicStrict = express.Router();

basicStrict.post("/", async (req, res) => {
	console.log(req.body);
	const ingredients = Object.values(req.body.ingredients).flat();
	req.body.ingredients = ingredients;
	res.send(await createAndRun("asst_vb17iC5KPmKAypn09S2rpQpG", JSON.stringify(req.body)));
});

export default basicStrict;

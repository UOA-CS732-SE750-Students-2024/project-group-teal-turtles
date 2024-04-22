import express from "express";

const freeForm = express.Router();

freeForm.get("/", async (req, res) => {
	var body = req.body.string;
	const levelOfStrictness = "Level of strictness for ingredients: Freedom";
	body = body + levelOfStrictness;
	res.send(await createAndRun(process.env.ASSISTANT_ID, body));
});

export default freeForm;

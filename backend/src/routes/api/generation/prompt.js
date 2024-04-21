import express from "express";

const prompt = express.Router();

prompt.post("/", (req, res) => {
	res.json({});
});

export default prompt;

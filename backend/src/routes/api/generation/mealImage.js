import express from "express";

import generateImage from "../../../segmind/segmind.js";
const mealImage = express.Router();

mealImage.post("/", async (req, res) => {
	const { mealName, ingredientsUser, ingredientsNeeded } = req.body;

	try {
		const image = await generateImage(mealName, ingredientsUser, ingredientsNeeded);
		res.send(image);
	} catch (error) {
		console.error("Error generating image:", error);
		res.status(500).send("error generating image");
	}
});

export default mealImage;

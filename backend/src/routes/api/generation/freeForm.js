import express from "express";

const freeForm = express.Router();

freeForm.post("/", (req, res) => {
	res.json({});
});

export default freeForm;

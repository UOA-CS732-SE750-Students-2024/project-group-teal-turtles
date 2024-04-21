import express from "express";

const remix = express.Router();

remix.post("/", (req, res) => {
	res.json({});
});

export default remix;

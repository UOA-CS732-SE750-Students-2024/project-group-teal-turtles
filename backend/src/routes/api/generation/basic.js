import express from "express";

const basic = express.Router();

basic.post("/", (req, res) => {
	res.json({});
});

export default basic;

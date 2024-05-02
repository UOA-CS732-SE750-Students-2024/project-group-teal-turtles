import express from "express";

import createAndRun from "../../../openAI/openAi.js";
const remix = express.Router();

remix.get("/", async (req, res) => {
	res.send(await createAndRun("asst_5ZJOV4GaQ8HAnRCptNDkprcu", JSON.stringify(req.body)));
});

export default remix;

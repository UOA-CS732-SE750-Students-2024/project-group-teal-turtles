import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Middleware function to authenticate and add user id to req, all requests require an authorisation header
const authenticateUser = async (req, res, next) => {
	const authToken = req.headers["authorization"];
	if (!authToken) {
		return res.status(401).json({ message: "Authorisation token is missing." });
	}
	try {
		req.uid = authToken;
		return next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid authorisation token." });
	}
};

app.use(authenticateUser);

import routes from "../../../routes.js";
app.use("/", routes);

module.exports = app;

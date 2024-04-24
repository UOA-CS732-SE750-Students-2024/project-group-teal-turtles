import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import createAndRun from "./openAI/openAi.js";

const app = express();

app.use(cors());
app.use(express.json());

// Middleware function to authenticate and add user id to req, all requests require an authorisation header
const authenticateUser = async (req, res, next) => {
	const authToken = req.headers.authorisation;
	if (!authToken) {
		return res.status(401).json({ message: "Authorisation token is missing." });
	}

	try {
		console.log("trying auth");
		const decodeToken = await admin.auth().verifyIdToken(authToken);
		if (decodeToken) {
			req.uid = decodeToken.uid;
			return next();
		}
		return res.json({ message: "unauthorised" });
	} catch (error) {
		return res.status(401).json({ message: "Invalid authorisation token." });
	}
};

app.use(authenticateUser);

import routes from "./routes/routes.js";
app.use("/", routes);
import admin from "./auth/firebase-config.js";

await mongoose.connect(process.env.DB_URL);
const PORT = process.env.PORT ?? 3000;
app.listen(3000, () => console.log(`Express Server is up and running on ${PORT}`));

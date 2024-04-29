import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import createAndRun from "./openAI/openAi.js";

const app = express();

app.use(cors());
app.use(express.json());
// import axios from "axios"; used by nathan can be removed after

// Middleware function to authenticate and add user id to req, all requests require an authorisation header, commented out part within function is used for testing and can be removed by Nathan
const authenticateUser = async (req, res, next) => {
	// const API_KEY = process.env.TESTING_FIREBASE_API_KEY;

	const authToken = req.headers.authorisation;
	if (!authToken) {
		return res.status(401).json({ message: "Authorisation token is missing." });
	}

	try {
		// const response = await axios.post(
		// 	"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
		// 	{
		// 		email: "1234@gmail.com",
		// 		password: "1234567",
		// 		returnSecureToken: true
		// 	}
		// );
		// const authToken = response.data.idToken;
		console.log("trying auth");
		const decodeToken = await admin.auth().verifyIdToken(authToken);
		req.uid = decodeToken.uid;
		return next();
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

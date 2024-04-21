import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import createAndRun from "./openAI/openAi.js";

const app = express();

app.use(cors());
app.use(express.json());

import routes from "./routes/routes.js";
app.use("/", routes);

await mongoose.connect(process.env.DB_URL);
const PORT = process.env.PORT ?? 3000;
app.listen(3000, () => console.log(`Express Server is up and running on ${PORT}`));

// const body =
// 	" { Ingredients you can include: Potato, Mushrooms, Cheese, Milk, Flour, Eggs, Rasins, Apple Ingredients you must exclude: Sugar Level of strictness for ingredients: Strict Favourite Meals: Pancakes Meal type: Preferred Cuisine type: }";
// await createAndRun(process.env.ASSISTANT_ID, body);

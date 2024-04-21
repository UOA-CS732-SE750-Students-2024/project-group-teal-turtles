import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database");

import { User } from "./schema.js";
import { retrieveUser, createUser, addFavouriteMeal, setIngredientTypeList } from "./user-dao.js";

User.deleteMany({})
	.then(() => createUser("id1"))
	.then(() => addFavouriteMeal("id1", "cheese burger"))
	.then(() => setIngredientTypeList("id1", "Dairy", ["food", "other"]))
	.then(() => {
		return retrieveUser("id1");
	})
	.then((user) => {
		console.log(user.favouriteMeals);
		console.log(user.ingredients);
	});

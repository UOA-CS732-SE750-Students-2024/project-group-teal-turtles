import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "./schema.js";
await mongoose.connect(process.env.DB_URL);
console.log("Connected to database");

let dummyUser = new User({
	favouriteMeals: ["Spaghetti Carbonara", "Chicken Stir-Fry"],
	generatedMeals: ["Chicken Stir-Fry", "Quinoa Salad"],
	ingredients: {
		VegetablesAndFruit: ["Tomatoes", "Broccoli"],
		Dairy: ["Milk", "Cheese"],
		Meat: ["Chicken", "Beef"],
		Baking: ["Flour", "Sugar"],
		Carbs: ["Rice", "Pasta"],
		Other: ["Canned Beans", "Olive Oil"]
	},
	dislikedIngredients: ["Mushrooms", "carrots"],
	parameters: {
		numberOfPeople: 2,
		mealType: "dinner",
		cuisine: "Italian",
		dietaryRequirements: ["vegetarian", "gluten-free"]
	}
});

try {
	await User.deleteMany({});
	await dummyUser.save();
} finally {
	await mongoose.disconnect();
	console.log("Disconnected from database");
}

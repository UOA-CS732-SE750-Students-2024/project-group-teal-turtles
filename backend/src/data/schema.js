import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: { type: String, required: true },
	favouriteMeals: { type: [{ type: String }], default: [] },
	generatedMeals: { type: [{ type: String }], default: [] },
	ingredients: { type: [{ type: String }], default: [] },
	dislikedIngredients: { type: [{ type: String }], default: [] },
	parameters: {
		numberOfPeople: { type: Number, default: 4 },
		mealType: { type: String, enum: ["Breakfast", "Lunch", "Dinner"], default: "Dinner" },
		cuisine: { type: String, default: "Any" },
		dietaryRequirements: { type: String, default: "None" }
	}
});

export const User = mongoose.model("User", userSchema, "Users");

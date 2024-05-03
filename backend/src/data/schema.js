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
		mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], default: "dinner" },
		cuisine: { type: String, default: "" },
		dietaryRequirements: [{ type: String, default: [] }]
	}
});

export const User = mongoose.model("User", userSchema, "Users");

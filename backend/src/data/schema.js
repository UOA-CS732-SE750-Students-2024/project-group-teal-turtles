import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: { type: String, required: true },
	favouriteMeals: { type: [{ type: String }], default: [] },
	generatedMeals: { type: [{ type: String }], default: [] },
	ingredients: {
		VegetablesAndFruit: { type: [{ type: String }], default: [] },
		Dairy: { type: [{ type: String }], default: [] },
		Meat: { type: [{ type: String }], default: [] },
		Baking: { type: [{ type: String }], default: [] },
		Carbs: { type: [{ type: String }], default: [] },
		Other: { type: [{ type: String }], default: [] }
	},
	dislikedIngredients: { type: [{ type: String }], default: [] },
	parameters: {
		numberOfPeople: { type: Number, default: 4 },
		mealType: { type: String, enum: ["breakfast", "lunch", "dinner"], default: "dinner" },
		cuisine: { type: String, default: "" },
		dietaryRequirements: [
			{ type: String, enum: ["vegetarian", "vegan", "pescatarian", "gluten-free", "dairy-free"], default: [] }
		]
	}
});

export const User = mongoose.model("User", userSchema, "Users");

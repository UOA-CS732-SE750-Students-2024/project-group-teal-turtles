import { User } from "./schema.js";
export async function retrieveUser(uid) {
	return await User.findById(uid);
}

export async function createUser(uid) {
	const existingUser = await User.findById(uid);
	if (existingUser) {
		throw { error: "User already exists in the database", status: 409 };
	}
	const newUser = new User({
		_id: uid
	});
	await newUser.save();
	return newUser;
}

export async function addFavouriteMeal(uid, newfavouriteMeal) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}

	if (user.favouriteMeals.includes(newfavouriteMeal)) {
		throw { error: "favMealToAdd already exists in the user's favorite meals", status: 400 };
	}
	const updatedUser = await User.findByIdAndUpdate(uid, { $addToSet: { favouriteMeals: newfavouriteMeal } });
	return updatedUser.favouriteMeals;
}

export async function deleteFavouriteMeal(uid, favouriteMealToDelete) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	if (!user.favouriteMeals.includes(favouriteMealToDelete)) {
		throw { error: "Meal not found in the user's favorite meals", status: 404 };
	}
	const updatedUser = await User.findByIdAndUpdate(uid, { $pull: { favouriteMeals: favouriteMealToDelete } });
	return updatedUser.favouriteMeals;
}

export async function getFavouriteMeals(uid) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	return user.favouriteMeals;
}

export async function addGeneratedMeal(uid, generatedMeal) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	return await User.findByIdAndUpdate(uid, { $addToSet: { generatedMeals: generatedMeal } });
}

export async function getGeneratedMeals(uid) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	return user.generatedMeals;
}

export async function setIngredients(uid, ingredients) {
	const updatedUser = await User.findByIdAndUpdate(uid, { ingredients: ingredients });
	if (!updatedUser) {
		throw { error: "User not found", status: 404 };
	}
	return updatedUser.ingredients;
}

export async function getIngredients(uid) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	return user.ingredients;
}

//not used
export async function setIngredientTypeList(uid, ingredientType, ingredients) {
	const user = await User.findByIdAndUpdate(uid, { $set: {} });
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	return await User.findByIdAndUpdate(uid, { $set: { [`ingredients.${ingredientType}`]: ingredients } });
}

//not currently used
export async function setDislikedIngredientsList(uid, dislikedIngredients) {
	return await User.findByIdAndUpdate(uid, { dislikedIngredients: dislikedIngredients });
}

export async function addDislikedIngredient(uid, dislikedIngredient) {
	const user = await User.findById(uid);

	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	if (user.dislikedIngredients.includes(dislikedIngredient)) {
		throw { error: "DislikedIngredient already exists in the user's disliked ingredients", status: 400 };
	}

	return await User.findByIdAndUpdate(uid, { $addToSet: { dislikedIngredients: dislikedIngredient } });
}

export async function getDislikedIngredients(uid) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	return user.dislikedIngredients;
}

export async function removeDislikedIngredient(uid, dislikedIngredientToRemove) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	if (!user.dislikedIngredients.includes(dislikedIngredientToRemove)) {
		throw { error: "Meal not found in the user's favorite meals", status: 404 };
	}

	return await User.findByIdAndUpdate(uid, { $pull: { dislikedIngredients: dislikedIngredientToRemove } });
}

export async function setUserParameters(uid, parameters) {
	const updatedUser = await User.findByIdAndUpdate(uid, { parameters: parameters });
	if (!updatedUser) {
		throw { error: "User not found", status: 404 };
	}
	return updatedUser;
}

export async function getParameters(uid) {
	const user = await User.findById(uid);
	if (!user) {
		throw { error: "User not found", status: 404 };
	}
	return user.parameters;
}

export async function deleteUser(uid) {
	const deletedUser = await User.findByIdAndDelete(uid);
	if (!deletedUser) {
		throw { error: "User not found", status: 404 };
	}
}

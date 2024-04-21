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
	return await User.findByIdAndUpdate(uid, { $addToSet: { favouriteMeals: newfavouriteMeal } });
}

export async function deleteFavouriteMeal(uid, favouriteMealToDelete) {
	return await User.findById(uid, { $pull: { favouriteMeals: favouriteMealToDelete } });
}

export async function getFavouriteMeals(uid) {
	return await User.findById(uid).favouriteMeals;
}

export async function addGeneratedMeal(uid, generatedMeal) {
	return await User.findByIdAndUpdate(uid, { $addToSet: { generatedMeals: generatedMeal } });
}

export async function getGeneratedMeals(uid) {
	return await User.findById(uid).generatedMeals;
}

export async function setIngredients(uid, pantry) {
	return await User.findByIdAndUpdate(uid, { pantry: pantry });
}

export async function getIngredients(uid) {
	return await User.findById(uid).ingredients;
}

export async function setIngredientTypeList(uid, ingredientType, ingredients) {
	User.findByIdAndUpdate(uid, { $set: {} });
	return await User.findByIdAndUpdate(uid, { $set: { [`ingredients.${ingredientType}`]: ingredients } });
}
//not currently used
export async function setDislikedIngredientsList(uid, dislikedIngredients) {
	return await User.findByIdAndUpdate(uid, { dislikedIngredients: dislikedIngredients });
}

export async function addDislikedIngredient(uid, dislikedIngredient) {
	return await User.findByIdAndUpdate(uid, { $addToSet: { dislikedIngredients: dislikedIngredient } });
}

export async function getDislikedIngredients(uid) {
	return await User.findById(uid).dislikedIngredients;
}

export async function removeDislikedIngredient(uid, dislikedIngredient) {
	return await User.findByIdAndUpdate(uid, { $pull: { dislikedIngredients: dislikedIngredient } });
}

export async function setUserParameters(uid, parameters) {
	return await User.findByIdAndUpdate(uid, { parameters: parameters });
}

export async function getParameters(uid) {
	return await User.findById(uid).parameters;
}

export async function deleteUser(uid) {
	await User.findByIdAndDelete(uid);
}

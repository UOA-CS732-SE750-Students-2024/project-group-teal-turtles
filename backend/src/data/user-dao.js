import { User } from "./schema.js";
export async function retrieveUser(uid) {
  return await User.findById(uid);
}

export async function createUser(uid) {
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

export async function addGeneratedMeal(uid, generatedMeal) {
  return await User.findByIdAndUpdate(uid, { $addToSet: { generatedMeals: generatedMeal } });
}

export async function setPantry(uid, pantry) {
  return await User.findByIdAndUpdate(uid, { pantry: pantry });
}

export async function setDislikedIngredientsList(uid, dislikedIngredients) {
  return await User.findByIdAndUpdate(uid, { dislikedIngredients: dislikedIngredients });
}

export async function addDislikedIngredient(uid, dislikedIngredient) {
  return await User.findByIdAndUpdate(uid, { $addToSet: { dislikedIngredients: dislikedIngredient } });
}

export async function setUserParameters(uid, parameters) {
  return await User.findByIdAndUpdate(uid, { parameters: parameters });
}

export async function deleteUser(uid) {
  await User.findByIdAndDelete(uid);
}

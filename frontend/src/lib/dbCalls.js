import axios from "axios";

export function saveIngredients(authToken, userIngredients) {
	try {
		axios.put(
			process.env.NEXT_PUBLIC_BACKEND_URL + "/users/ingredients",
			{
				ingredients: userIngredients
			},
			{
				headers: {
					Authorization: authToken
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}

export function addDislikedIngredient(authToken, dislikedIngredient) {
	try {
		axios.put(
			process.env.NEXT_PUBLIC_BACKEND_URL + "/users/ingredients/disliked/add",
			{
				dislikedIngredientToAdd: dislikedIngredient
			},
			{
				headers: {
					Authorization: authToken
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}
export function removeDislikedIngredient(authToken, dislikedIngredient) {
	try {
		axios.put(
			process.env.NEXT_PUBLIC_BACKEND_URL + "/users/ingredients/disliked/remove",
			{
				dislikedIngredientToRemove: dislikedIngredient
			},
			{
				headers: {
					Authorization: authToken
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}

export function setDislikedIngredient(authToken, dislikedIngredients) {
	try {
		axios.put(
			process.env.NEXT_PUBLIC_BACKEND_URL + "/users/ingredients/disliked",
			{
				dislikedIngredients: dislikedIngredients
			},
			{
				headers: {
					Authorization: authToken
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}

export function addFavMeal(authToken, favMeal) {
	try {
		axios.put(
			process.env.NEXT_PUBLIC_BACKEND_URL + "/users/meals/favourite/add",
			{
				favMealToAdd: favMeal
			},
			{
				headers: {
					Authorization: authToken
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}
export function removeFavMeal(authToken, favMeal) {
	try {
		axios.put(
			process.env.NEXT_PUBLIC_BACKEND_URL + "/users/meals/favourite/remove",
			{
				favMealToDelete: favMeal
			},
			{
				headers: {
					Authorization: authToken
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}
export function saveParameters(authToken, userParameters) {
	try {
		axios.put(
			process.env.NEXT_PUBLIC_BACKEND_URL + "/users/parameters",
			{ parameters: userParameters },
			{
				headers: {
					Authorization: authToken
				}
			}
		);
	} catch (error) {
		console.error(error);
	}
}

export function addGeneratedMeal(authToken, mealName) {
	try {
		axios.put(
			process.env.NEXT_PUBLIC_BACKEND_URL + "/users/meals",
			{ mealToAdd: mealName },
			{
				headers: { Authorization: authToken }
			}
		);
	} catch (error) {
		console.error(error);
	}
}

export function generateRecipe(authToken, mealName, ingredients, numberOfPeople) {
	return axios.post(
		process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/recipe",
		{
			mealName: mealName,
			ingredients: ingredients,
			numberOfPeople: numberOfPeople
		},
		{
			headers: {
				Authorization: authToken
			}
		}
	);
}

export function generateMealRemix(authToken, body) {
	return axios.post(
		process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/remix",
		{
			body
		},
		{
			headers: {
				Authorization: authToken
			}
		}
	);
}

export function generateMealPrompt(authToken, prompt) {
	return axios.post(
		process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/prompt",
		{
			prompt: prompt
		},
		{
			headers: {
				Authorization: authToken
			}
		}
	);
}

export function generateMealLoose(authToken, body) {
	return axios.post(
		process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/basicLoose",
		{
			body
		},
		{
			headers: {
				Authorization: authToken
			}
		}
	);
}

export function generateMealStrict(authToken, body) {
	return axios.post(
		process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/basicStrict",
		{
			body
		},
		{
			headers: {
				Authorization: authToken
			}
		}
	);
}
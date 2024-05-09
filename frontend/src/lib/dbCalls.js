import axios from "axios";

/**
 * Function for saving user ingredients to the backend.
 * @param {string} authToken - The authentication token of the user.
 * @param {string[]} userIngredients - The ingredients to be saved.
 */
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

/**
 * Function for adding a disliked ingredient for the user.
 * @param {string} authToken - The authentication token of the user.
 * @param {string} dislikedIngredient - The disliked ingredient to add.
 */
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

/**
 * Function for removing a disliked ingredient for the user.
 * @param {string} authToken - The authentication token of the user.
 * @param {string} dislikedIngredient - The disliked ingredient to remove.
 */
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

/**
 * Function for setting the disliked ingredients for the user.
 * @param {string} authToken - The authentication token of the user.
 * @param {string[]} dislikedIngredients - The list of disliked ingredients.
 */
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

/**
 * Function for adding a favorite meal for the user.
 * @param {string} authToken - The authentication token of the user.
 * @param {string} favMeal - The favorite meal to add.
 */
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

/**
 * Function for removing a favorite meal for the user.
 * @param {string} authToken - The authentication token of the user.
 * @param {string} favMeal - The favorite meal to remove.
 */
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

/**
 * Function for saving user parameters to the backend.
 * @param {string} authToken - The authentication token of the user.
 * @param {Object} userParameters - The parameters to be saved.
 */
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

/**
 * Function for adding a generated meal for the user.
 * @param {string} authToken - The authentication token of the user.
 * @param {string} mealName - The name of the generated meal to add.
 */
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

/**
 * Function for generating a recipe.
 * @param {string} authToken - The authentication token of the user.
 * @param {string} mealName - The name of the meal.
 * @param {string[]} ingredients - The ingredients used in the meal.
 * @param {number} numberOfPeople - The number of people the recipe is for.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the backend.
 */
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

/**
 * Function for generating a meal using remix.
 * @param {string} authToken - The authentication token of the user.
 * @param {Object} body - The request body for the remix generation.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the backend.
 */
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

/**
 * Function for generating a meal using prompt.
 * @param {string} authToken - The authentication token of the user.
 * @param {string} prompt - The prompt for the meal generation.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the backend.
 */
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

/**
 * Function for generating a meal using loose constraints.
 * @param {string} authToken - The authentication token of the user.
 * @param {Object} body - The request body for the loose generation.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the backend.
 */
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

/**
 * Function for generating a meal using strict constraints.
 * @param {string} authToken - The authentication token of the user.
 * @param {Object} body - The request body for the strict generation.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the backend.
 */
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

/**
 * Function for generating a meal using strict constraints.
 * @param {string} authToken - The authentication token of the user.
 * @param {Object} body - The request body for the strict generation.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the backend.
 */
export function getUser(userAuthToken) {
	return axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/users", {
		headers: {
			Authorization: userAuthToken
		}
	});
}

/**
 * Function for creating a new user.
 * @param {string} userAuthToken - The authentication token of the user.
 * @returns {Promise<AxiosResponse>} A promise that resolves with the response from the backend.
 */
export function createUser(userAuthToken) {
	return axios.post(
		process.env.NEXT_PUBLIC_BACKEND_URL + "/users",
		{},
		{
			headers: {
				Authorization: userAuthToken
			}
		}
	);
}

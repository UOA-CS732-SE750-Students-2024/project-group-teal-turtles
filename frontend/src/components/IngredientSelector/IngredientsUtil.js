import { Typography, Stack } from "@mui/material";
import React from "react";

/**
 * Make an ingredient object
 * @param {string} name The name of the ingredient
 * @param {string} category The category that the ingredient belongs to
 * @returns An ingredient object
 */
export const makeIngredient = (name, category) => {
	return { name, category };
};

/**
 * Makes an array of ingredients, to initialize the state
 * @returns An array of initial ingredients
 */
export const makeInitialIngredients = () => {
	return [
		makeIngredient("test", "test"),
		makeIngredient("test1", "test1"),
		makeIngredient("test2", "test2"),
		makeIngredient("test3", "test3"),
		makeIngredient("test4", "test")
	];
};

/**
 * Sorts an array of ingredient objects by their category
 * @param {Array<{name: string, category: string}>} ingredients
 * @returns {Object.<string, number>} Sorts the ingredients by their category
 */
export const sortIngredientsByCategory = (ingredients) => {
	const sortedIngredients = {};
	ingredients.forEach((ingredient) => {
		if (!sortedIngredients[ingredient.category]) {
			sortedIngredients[ingredient.category] = []; // Initialize as empty array if key doesn't exist
		}
		sortedIngredients[ingredient.category].push(ingredient.name);
	});
	return sortedIngredients;
};

/**
 * Renders the sorted ingredients
 * @param {Array<{Object.<number, string>}>} sortedIngredients The sorted ingredients
 * @returns {Array<{Object.<string, number>}>} A list of sorted ingredients
 */
export const renderSortedIngredients = (sortedIngredients) => {
	const renderedIngredients = [];

	let index = 0;
	for (const [category, ingredients] of Object.entries(sortedIngredients)) {
		index++;
		renderedIngredients.push(
			<Stack key={index} direction="row">
				<Typography variant="body1" gutterBottom>
					{`${category} : ${ingredients.join(", ")}`}
				</Typography>
			</Stack>
		);
	}

	return renderedIngredients;
};

/**
 * Utility functions for ingredient search and categorization.
 * @module SearchUtil
 */

import ingredients from "@/lib/ingredients.json";
import Fuse from "fuse.js";

const fuse = new Fuse(ingredients, {
	keys: ["title"],
	threshold: 0.4
});

/**
 * Processes the search results and returns an array of items.
 *
 * @param {Array} searchResults - The search results from Fuse.js.
 * @returns {Array} - An array of items extracted from the search results.
 */
const processSearchResults = (searchResults) => {
	return searchResults.map((result) => result.item);
};

/**
 * Searches for ingredients based on a search term.
 *
 * @param {string} searchTerm - The term to search for.
 * @returns {Array} - An array of ingredients matching the search term.
 */
export const searchIngredients = (searchTerm) => {
	const results = fuse.search(searchTerm);
	return processSearchResults(results);
};

/**
 * Categorizes ingredients based on their categories.
 *
 * @param {Array} ingredients - The list of ingredients to categorize.
 * @returns {Object} - An object containing categorized ingredients.
 */
export const categorizeIngredients = (ingredients) => {
	const categorizedIngredients = {};
	for (let ingredient of ingredients) {
		ingredient.categories.forEach((category) => {
			if (!categorizedIngredients[category]) {
				categorizedIngredients[category] = [];
			}
			categorizedIngredients[category].push(ingredient);
		});
	}
	return categorizedIngredients;
};


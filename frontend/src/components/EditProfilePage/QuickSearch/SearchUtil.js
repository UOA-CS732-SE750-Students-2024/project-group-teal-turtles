import ingredients from "@/ingredients.json";
import Fuse from "fuse.js";

const fuse = new Fuse(ingredients, {
	keys: ["title"],
	threshold: 0.4
});

const processSearchResults = (searchResults) => {
	return searchResults.map((result) => result.item);
};

export const searchIngredients = (searchTerm) => {
	const results = fuse.search(searchTerm);
	return processSearchResults(results);
};

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

export const extractIngredients = (categorizedIngredients, category) => {
	return categorizedIngredients[category].map((key)=>categorizeIngredients[key]);
}


// const extractCategories = () => {
// 	const categories = new Set();
// 	ingredients.forEach((ingredient) => {
// 		ingredient.categories.forEach((category) => {
// 			categories.add(category);
// 		});
// 	});
// 	return Array.from(categories);
// };

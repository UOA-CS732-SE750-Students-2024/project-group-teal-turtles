import ingredients from "@/ingredients.json";
import Fuse from 'fuse.js';

const fuse = new Fuse(ingredients, {
    keys: ['title'],
    threshold: 0.4,
});

export const searchIngredients = (searchTerm) => {
    const results = fuse.search(searchTerm);
    return results;
};

export const categorizeIngredients = (ingredients) => {
    const categorizedIngredients = {};
	console.log(ingredients);
	// ingredients.forEach((ingredient) => {
    //     console.log(ingredient.categories);
    //     ingredient.categories.forEach((category) => {
	// 		if (!categorizedIngredients[category]) {
	// 			categorizedIngredients[category] = [];
	// 		}
	// 		categorizedIngredients[category].push(ingredient);
	// 	});
	// });
	return categorizedIngredients;
};

// const extractCategories = () => {
// 	const categories = new Set();
// 	ingredients.forEach((ingredient) => {
// 		ingredient.categories.forEach((category) => {
// 			categories.add(category);
// 		});
// 	});
// 	return Array.from(categories);
// };
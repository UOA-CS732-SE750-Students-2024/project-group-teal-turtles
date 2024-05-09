import { searchIngredients, categorizeIngredients } from "@/components/edit-profile/QuickSearch/SearchUtil";
import { Divider } from "@mui/material";
import DisplayIngredients from "@/components/edit-profile/QuickSearch/DisplayIngredients";
import allIngredients from "@/ingredients.json";

function SearchResults({ searchResults, selectedIngredients, handleSelectIngredient }) {
	const categorizedResults = categorizeIngredients(searchResults);
	delete categorizedResults["Onboarding"];
	console.log(categorizedResults);

	const renderedResults = [];
	for (let category in categorizedResults) {
		const ingredients = Object.values(categorizedResults[category]);
		renderedResults.push(
			<>
				<Divider key={category}>{category.toUpperCase()}</Divider>
				<DisplayIngredients
					ingredients={ingredients}
					selectedIngredients={selectedIngredients}
					handleSelectIngredient={handleSelectIngredient}
				/>
			</>
		);
	}

	return <>{renderedResults}</>;
}

export default SearchResults;

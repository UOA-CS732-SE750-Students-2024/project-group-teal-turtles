import { searchIngredients, categorizeIngredients } from "@/components/EditProfilePage/QuickSearch/SearchUtil";
import { Divider } from "@mui/material";
import DisplayIngredients from "@/components/EditProfilePage/QuickSearch/DisplayIngredients";
import ingredients from "@/ingredients.json";

function SearchResults({ searchTerm, selectedIngredients, handleSelectIngredient }) {
	const searchResults = searchTerm == "" ? ingredients : searchIngredients(searchTerm);
	const categorizedResults = categorizeIngredients(searchResults);

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

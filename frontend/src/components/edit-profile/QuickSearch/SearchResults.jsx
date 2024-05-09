import { categorizeIngredients } from "@/lib/SearchUtil";
import { Divider, Stack, Typography } from "@mui/material";
import DisplayIngredients from "@/components/edit-profile/QuickSearch/DisplayIngredients";

/**
 * SearchResults component displays categorized search results with the ability to select ingredients.
 * @param {object} props - The component props.
 * @param {Array} props.searchResults - The search results to display.
 * @param {Array} props.selectedIngredients - The currently selected ingredients.
 * @param {function} props.handleSelectIngredient - Function to handle ingredient selection.
 * @returns {JSX.Element} A React JSX element representing the SearchResults.
 */

function SearchResults({ searchResults, selectedIngredients, handleSelectIngredient }) {
	const categorizedResults = categorizeIngredients(searchResults);
	delete categorizedResults["Onboarding"];

	const renderedResults = [];
	for (let category in categorizedResults) {
		const ingredients = Object.values(categorizedResults[category]);
		renderedResults.push(
			<>
				<Divider sx={{ mb: "2vh" }} key={category}>
					<Typography fontWeight="bold" sx={{ color: "primary.main" }}>
						{category}
					</Typography>
				</Divider>
				<DisplayIngredients
					ingredients={ingredients}
					selectedIngredients={selectedIngredients}
					handleSelectIngredient={handleSelectIngredient}
				/>
			</>
		);
	}

	return <Stack>{renderedResults}</Stack>;
}

export default SearchResults;

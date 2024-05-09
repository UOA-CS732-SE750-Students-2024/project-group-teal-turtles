import { categorizeIngredients } from "@/lib/SearchUtil";
import { Divider, Stack, Typography } from "@mui/material";
import DisplayIngredients from "@/components/edit-profile/QuickSearch/DisplayIngredients";

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

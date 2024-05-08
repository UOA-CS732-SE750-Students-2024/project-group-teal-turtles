import React from "react";
import { categorizeIngredients } from "./SearchUtil";
import { Divider, Grid, Card, CardMedia } from "@mui/material";
import { render } from "@testing-library/react";

function DisplayIngredients({ ingredients }) {
	return (
		<Grid container spacing={2}>
			{ingredients.map((ingredient) => (
				<Grid item key={ingredient.title}>
					<Card sx={{ width: 50, height: 50 }}>
						<CardMedia component="img" image={ingredient.img} alt={ingredient.title} />
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

function SearchResults({ searchResults }) {
	const categorizedResults = categorizeIngredients(searchResults);

	const renderedResults = [];
	for (let category in categorizedResults) {
		const ingredients = Object.values(categorizedResults[category]);
		renderedResults.push(
			<>
				<Divider key={category}>{category.toUpperCase()}</Divider>
				<DisplayIngredients ingredients={ingredients} />
			</>
		);
	}

	return (
		<>
			{JSON.stringify(categorizedResults)}
			{renderedResults}
		</>
	);
}

export default SearchResults;

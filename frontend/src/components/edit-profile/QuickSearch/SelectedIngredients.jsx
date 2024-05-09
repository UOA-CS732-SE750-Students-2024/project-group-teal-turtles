import React from "react";
import DisplayIngredients from "./DisplayIngredients";
import { Divider, Stack } from "@mui/material";
import allIngredients from "@/ingredients.json";

function SelectedIngredients({ selectedIngredients, handleSelectIngredient }) {
	if (!selectedIngredients.length) {
		return null;
	}

	const ingredients = allIngredients.filter((item) => selectedIngredients.includes(item.title));

	ingredients.sort((a, b) => {
		const indexA = selectedIngredients.indexOf(a.title);
		const indexB = selectedIngredients.indexOf(b.title);
		return indexA - indexB;
	});

	return (
		<Stack alignItems="center">
			<Divider sx={{ mb: "2vh" }} />
			<DisplayIngredients
				ingredients={ingredients}
				selectedIngredients={selectedIngredients}
				handleSelectIngredient={handleSelectIngredient}
			/>
		</Stack>
	);
}

export default SelectedIngredients;

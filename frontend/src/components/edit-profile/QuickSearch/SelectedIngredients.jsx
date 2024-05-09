import React from "react";
import DisplayIngredients from "./DisplayIngredients";
import { Divider } from "@mui/material";
import allIngredients from "@/lib/ingredients.json";

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
		<>
			<Divider sx={{ mb: "2vh" }}>SELECTED</Divider>
			<DisplayIngredients
				ingredients={ingredients}
				selectedIngredients={selectedIngredients}
				handleSelectIngredient={handleSelectIngredient}
			/>
		</>
	);
}

export default SelectedIngredients;

import React from "react";
import DisplayIngredients from "./DisplayIngredients";
import { Divider, Stack } from "@mui/material";
import allIngredients from "@/lib/ingredients.json";

/**
 * SelectedIngredients component displays a list of selected ingredients.
 * @param {object} props - The component props.
 * @param {Array} props.selectedIngredients - The array of selected ingredient titles.
 * @param {function} props.handleSelectIngredient - Function to handle ingredient selection.
 * @returns {JSX.Element | null} A React JSX element representing the list of selected ingredients, or null if there are no selected ingredients.
 */
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

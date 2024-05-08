import React from "react";
import DisplayIngredients from "./DisplayIngredients";
import { Divider } from "@mui/material";

function SelectedIngredients({ ingredients, selectedIngredients, handleSelectIngredient }) {
	if (!selectedIngredients.length) {
		return null;
	}

	return (
		<>
			<Divider>SELECTED</Divider>
			<DisplayIngredients
				ingredients={ingredients}
				selectedIngredients={selectedIngredients}
				handleSelectIngredient={handleSelectIngredient}
			/>
		</>
	);
}

export default SelectedIngredients;

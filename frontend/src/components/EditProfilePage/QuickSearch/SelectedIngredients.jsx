import React from "react";
import DisplayIngredients from "./DisplayIngredients";
import { Divider } from "@mui/material";
import allIngredients from "@/ingredients.json";

function SelectedIngredients({ selectedIngredients, handleSelectIngredient }) {
    if (!selectedIngredients.length) {
        return null;
    }

    const ingredients = allIngredients.filter((item) => selectedIngredients.includes(item.title));

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

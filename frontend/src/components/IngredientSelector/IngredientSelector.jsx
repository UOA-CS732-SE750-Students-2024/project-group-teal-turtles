import React, { useState, useMemo } from "react";
import styles from "./IngredientSelector.module.css";
import { Button, Paper, Typography } from "@mui/material";
import {
	makeInitialIngredients,
	sortIngredientsByCategory,
	makeIngredient,
	renderSortedIngredients
} from "./IngredientsUtil";

function IngredientSelector() {
	const [ingredients, setIngredients] = useState(makeInitialIngredients());
	const sortedIngredients = sortIngredientsByCategory(ingredients);

	const handleAddIngredient = () => {
		const name = prompt("Enter ingredient name");
		const category = prompt("Enter ingredient category");

		const newIngredient = makeIngredient(name, category);
		setIngredients([...ingredients, newIngredient]);
	};

	return (
		<Paper>
			<Typography variant="h2" align="center" gutterBottom>
				Your Ingredients
			</Typography>
			<Button variant="contained" color="primary" className={styles.button} onClick={handleAddIngredient}>
				{"Add Ingredient"}
			</Button>
			{renderSortedIngredients(sortedIngredients)}
		</Paper>
	);
}

export default IngredientSelector;

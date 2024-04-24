import React, { useState, useMemo } from "react";
import styles from "./IngredientSelector.module.css";
import { Button, Paper, Typography, Stack } from "@mui/material";

const makeIngredient = (name, category) => {
	return { name, category };
};

const makeInitialIngredients = () => {
	return [
		makeIngredient("test", "test"),
		makeIngredient("test1", "test1"),
		makeIngredient("test2", "test2"),
		makeIngredient("test3", "test3"),
		makeIngredient("test4", "test")
	];
};

const sortIngredientsByCategory = (ingredients) => {
	const sortedIngredients = {};
	ingredients.forEach((ingredient) => {
		if (!sortedIngredients[ingredient.category]) {
			sortedIngredients[ingredient.category] = []; // Initialize as empty array if key doesn't exist
		}
		sortedIngredients[ingredient.category].push(ingredient.name);
	});
	return sortedIngredients;
};

const renderSortedIngredients = (sortedIngredients) => {
	const renderedIngredients = [];

	let index = 0;
	for (const [category, ingredients] of Object.entries(sortedIngredients)) {
		index++;
		renderedIngredients.push(
			<Stack key={index} direction="row">
				<Typography variant="body1" gutterBottom>
					{`${category} : ${ingredients.join(", ")}`}
				</Typography>
			</Stack>
		);
	}

	return renderedIngredients;
};

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

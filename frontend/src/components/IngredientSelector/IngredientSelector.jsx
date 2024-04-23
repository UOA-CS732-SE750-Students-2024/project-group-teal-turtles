"use client"

import React, { useState } from "react";
import styles from "./IngredientSelector.module.css";
import { Button, Paper, Typography, Stack } from "@mui/material";

const makeIngredient = (name, category) => {
	return { name, category };
};

function IngredientSelector() {
	const [ingredients, setIngredients] = useState([
		makeIngredient("test", "test"),
		makeIngredient("test1", "test1"),
		makeIngredient("test2", "test2"),
		makeIngredient("test3", "test3")
	]);

	return (
		<Paper>
			<Typography variant="h2" align="center" gutterBottom>
				Your Ingredients
			</Typography>
			<Button variant="contained" color="primary" className={styles.button} />
			{ingredients.map((ingredient, index) => (
				<Stack key={index} direction="row">
					<Typography variant="body1" gutterBottom>
						{`${ingredient.category} : `}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{ingredient.name}
					</Typography>
				</Stack>
			))}
		</Paper>
	);
}

export default IngredientSelector;

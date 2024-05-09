import React from "react";
import { Grid, Card, CardActionArea, Typography, Stack } from "@mui/material";
import Image from "next/image";

/**
 * Represents a single ingredient display card.
 * @param {Object} props - The props object.
 * @param {Object} props.ingredient - The ingredient object containing title and img properties.
 * @param {boolean} props.isSelected - Boolean indicating whether the ingredient is selected.
 * @param {Function} props.handleSelect - Click event handler for selecting the ingredient.
 * @returns {JSX.Element} The JSX representation of the DisplayIngredient component.
 */
function DisplayIngredient({ ingredient, isSelected, handleSelect }) {
	return (
		<Stack alignItems="center">
			<Card
				sx={{
					backgroundColor: isSelected ? "primary.main" : "background.paper",
					color: isSelected ? "background.paper" : "secondary.dark"
				}}
			>
				<CardActionArea onClick={handleSelect}>
					<Image
						src={`${ingredient.img}`}
						alt={ingredient.title}
						width={100}
						height={100}
						priority
						style={{ filter: isSelected ? "invert(100%)" : "none" }}
					/>
				</CardActionArea>
			</Card>
			<Typography variant="body1" fontWeight="bold" sx={{ color: isSelected ? "primary.main" : "secondary.dark" }}>
				{ingredient.title}
			</Typography>
		</Stack>
	);
}

/**
 * Represents a grid of ingredients to display.
 * @param {Object} props - The props object.
 * @param {Array} props.ingredients - The array of ingredient objects to display.
 * @param {Array} props.selectedIngredients - The array of selected ingredient titles.
 * @param {Function} props.handleSelectIngredient - Click event handler for selecting an ingredient.
 * @returns {JSX.Element} The JSX representation of the DisplayIngredients component.
 */
function DisplayIngredients({ ingredients, selectedIngredients, handleSelectIngredient }) {
	return (
		<Grid container spacing={2} sx={{ mb: "2vh" }}>
			{ingredients.map((ingredient, index) => (
				<Grid item key={index}>
					<DisplayIngredient
						ingredient={ingredient}
						isSelected={selectedIngredients.includes(ingredient.title)}
						handleSelect={handleSelectIngredient(ingredient.title)}
					/>
				</Grid>
			))}
		</Grid>
	);
}

export default DisplayIngredients;

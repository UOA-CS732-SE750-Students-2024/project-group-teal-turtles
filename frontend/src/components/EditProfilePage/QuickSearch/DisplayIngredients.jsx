import React from "react";
import { Grid, Card, CardMedia, CardActionArea } from "@mui/material";

function DisplayIngredient({ ingredient, isSelected, handleSelect }) {
	return (
		<Card
			sx={{
				width: 50,
				height: 50,
				backgroundColor: isSelected ? "primary.main" : "#fff",
				color: isSelected ? "#fff" : "#000"
			}}
		>
			<CardActionArea onClick={handleSelect}>
				<CardMedia component="img" image={ingredient.img} alt={ingredient.title} />
			</CardActionArea>
		</Card>
	);
}

function DisplayIngredients({ ingredients, selectedIngredients, handleSelectIngredient }) {
	return (
		<Grid container spacing={2}>
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

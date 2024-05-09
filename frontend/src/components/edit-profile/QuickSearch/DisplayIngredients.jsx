import React from "react";
import { Grid, Card, CardActionArea, Typography, Stack } from "@mui/material";
import Image from "next/image";

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

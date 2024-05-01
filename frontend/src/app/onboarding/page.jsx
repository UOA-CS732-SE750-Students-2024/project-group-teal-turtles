"use client";

import CardWrapper from "@/components/CardWrapper/CardWrapper";
import PantryGrid from "@/components/Pantry/PantryGrid";
import { ChevronLeft } from "@mui/icons-material";
import { Stack, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";

function Onboarding() {
	const [favouriteMeals, setFavouriteMeals] = useState([]);
	const [ingredients, setIngredients] = useState([]);
	const [page, setPage] = useState("meals");

	const handleMealsChange = (item) => {
		if (favouriteMeals.includes(item)) {
			const newMeals = favouriteMeals.filter((meal) => meal !== item);
			setFavouriteMeals(newMeals);
		} else {
			setFavouriteMeals([...favouriteMeals, item]);
		}
	};

	const handleIngredientsChange = (item) => {
		if (ingredients.includes(item)) {
			const newIngredients = ingredients.filter((ingredient) => ingredient !== item);
			setIngredients(newIngredients);
		} else {
			setIngredients([...ingredients, item]);
		}
	};

	return (
		<CardWrapper>
			<Stack alignItems="center" width="700px">
				{page === "ingredients" ? (
					<>
						<Stack alignItems="center">
							<Stack direction="row" alignItems="center" width="100%" justifyContent="center">
								<IconButton
									sx={{ height: "56px", position: "relative" }}
									onClick={() => {
										setPage("meals");
									}}
								>
									<ChevronLeft sx={{ fontSize: "40px", color: "#000" }} />
								</IconButton>
								<Typography variant="h2" marginRight="56px">
									Add Ingredients
								</Typography>
							</Stack>
							<Typography variant="h6" textAlign="center">
								Add ingredients that you have, in order to aid with recipe recommendation.
							</Typography>
						</Stack>
						<Stack marginY="30px">
							<PantryGrid
								itemData={meals}
								variant="onboarding"
								onClick={handleIngredientsChange}
								selected={ingredients}
							/>
						</Stack>
						<Button variant="contained" sx={{ textTransform: "none", py: 1.5, width: "50%" }}>
							<Typography variant="h6">Continue</Typography>
						</Button>
					</>
				) : (
					<>
						<Stack alignItems="center">
							<Typography variant="h2">Add Favourite Meals</Typography>
							<Typography variant="h6" textAlign="center">
								Select Meals below that you love, in order to aid with recipe recommendation.
							</Typography>
						</Stack>
						<Stack marginY="30px">
							<PantryGrid itemData={meals} variant="onboarding" onClick={handleMealsChange} selected={favouriteMeals} />
						</Stack>
						<Button
							variant="contained"
							sx={{ textTransform: "none", py: 1.5, width: "50%" }}
							onClick={() => {
								setPage("ingredients");
							}}
						>
							<Typography variant="h6">Continue</Typography>
						</Button>
					</>
				)}
			</Stack>
		</CardWrapper>
	);
}

// TODO: Update images here
const meals = [
	{
		img: "/images/pantry-icons/fruit/apple.png",
		title: "Pizza"
	},
	{
		img: "/images/pantry-icons/fruit/avocado.png",
		title: "Ramen"
	},
	{
		img: "/images/pantry-icons/fruit/banana.png",
		title: "Hamburger"
	},
	{
		img: "/images/pantry-icons/fruit/blueberry.png",
		title: "Paella"
	},
	{
		img: "/images/pantry-icons/fruit/cantaloupe.png",
		title: "Chicken Tikka"
	},
	{
		img: "/images/pantry-icons/fruit/cherry.png",
		title: "Pad Thai"
	},
	{
		img: "/images/pantry-icons/fruit/coconut.png",
		title: "Sushi"
	},
	{
		img: "/images/pantry-icons/fruit/dragonfruit.png",
		title: "Lasagna"
	},
	{
		img: "/images/pantry-icons/fruit/durian.png",
		title: "Fried Chicken"
	},
	{
		img: "/images/pantry-icons/fruit/coconut.png",
		title: "Shepherd's Pie"
	},
	{
		img: "/images/pantry-icons/fruit/dragonfruit.png",
		title: "Beef Ribs"
	},
	{
		img: "/images/pantry-icons/fruit/durian.png",
		title: "Spicy Curry"
	}
];

export default Onboarding;

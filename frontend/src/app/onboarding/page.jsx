"use client";

import CardWrapper from "@/components/CardWrapper/CardWrapper";
import PantryGrid from "@/components/Pantry/PantryGrid";
import { Stack, Typography, Button } from "@mui/material";
import { useState } from "react";

function Onboarding() {
	const [favouriteMeals, setFavouriteMeals] = useState([]);

	const handleAdd = (item) => {
		setFavouriteMeals([...favouriteMeals, item]);
	};

	return (
		<CardWrapper>
			<Stack alignItems="center" width="700px">
				<Stack alignItems="center">
					<Typography variant="h2">Add Favourite Meals</Typography>
					<Typography variant="h6" textAlign="center">
						Select Meals below that you love, in order to aid with recipe recommendation.
					</Typography>
				</Stack>
				<Stack marginY="30px">
					<PantryGrid itemData={meals} variant="onboarding" onClick={handleAdd} />
				</Stack>
				<Button variant="contained" sx={{ textTransform: "none", py: 1.5, width: "50%" }}>
					<Typography variant="h6">Continue</Typography>
				</Button>
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

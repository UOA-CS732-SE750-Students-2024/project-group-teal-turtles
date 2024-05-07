"use client";

import CardWrapper from "@/components/CardWrapper/CardWrapper";
import PantryGrid from "@/components/Pantry/PantryGrid";
import { ChevronLeft } from "@mui/icons-material";
import { Stack, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useDataStore from "@/lib/store";

function Onboarding() {
	const [page, setPage] = useState("meals");
	const router = useRouter();
	const { userIngredients, setUserIngredients, setUserFavouriteMeals, userFavouriteMeals } = useDataStore();

	const handleMealsChange = (item) => {
		if (userFavouriteMeals.includes(item)) {
			const newMeals = userFavouriteMeals.filter((meal) => meal !== item);
			setUserFavouriteMeals(newMeals);
		} else {
			setUserFavouriteMeals([...userFavouriteMeals, item]);
		}
	};

	const handleIngredientsChange = (item) => {
		if (userIngredients.includes(item)) {
			const newIngredients = userIngredients.filter((ingredient) => ingredient !== item);
			setUserIngredients(newIngredients);
		} else {
			setUserIngredients([...userIngredients, item]);
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
									sx={{ height: "56px", marginRight: "44px", position: "relative" }}
									onClick={() => {
										setPage("meals");
									}}
								>
									<ChevronLeft sx={{ fontSize: "40px", color: "#000" }} />
								</IconButton>
								<Typography variant="h2" marginRight="100px" fontWeight="700" sx={{ color: "primary.main" }}>
									Add Ingredients
								</Typography>
							</Stack>
							<Typography variant="h6" textAlign="center">
								Add ingredients that you have, in order to aid with recipe recommendation.
							</Typography>
						</Stack>
						<Stack marginY="30px">
							<PantryGrid
								itemData={ingredients}
								variant="onboarding"
								onClick={handleIngredientsChange}
								selected={userIngredients}
							/>
						</Stack>
						<Button
							variant="contained"
							sx={{ textTransform: "none", py: 1.5, width: "50%" }}
							onClick={() => router.push("/dashboard")}
						>
							<Typography variant="h6">Continue</Typography>
						</Button>
					</>
				) : (
					<>
						<Stack alignItems="center">
							<Typography variant="h2" fontWeight="700" sx={{ color: "primary.main" }}>
								Add Favourite Meals
							</Typography>
							<Typography variant="h6" textAlign="center">
								Select some meals below that you love, in order to aid with recipe generation.
							</Typography>
						</Stack>
						<Stack marginY="30px">
							<PantryGrid
								itemData={meals}
								variant="onboarding"
								onClick={handleMealsChange}
								selected={userFavouriteMeals}
							/>
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

const ingredients = [
	{
		img: "/images/pantry-icons/carbohydrates/bread/bun.png",
		title: "Bun"
	},
	{
		img: "/images/pantry-icons/protein/eggs.png",
		title: "Eggs"
	},
	{
		img: "/images/pantry-icons/vegetables/lettuce.png",
		title: "Lettuce"
	},
	{
		img: "/images/pantry-icons/vegetables/onion.png",
		title: "Onion"
	},
	{
		img: "/images/pantry-icons/dairy/milk.png",
		title: "Milk"
	},
	{
		img: "/images/pantry-icons/fruit/tomato.png",
		title: "Tomato"
	},
	{
		img: "/images/pantry-icons/vegetables/garlic.png",
		title: "Garlic"
	},
	{
		img: "/images/pantry-icons/vegetables/carrot.png",
		title: "Carrot"
	},
	{
		img: "/images/pantry-icons/dairy/butter.png",
		title: "Butter"
	},
	{
		img: "/images/pantry-icons/carbohydrates/pasta/penne.png",
		title: "Spaghetti"
	},
	{
		img: "/images/pantry-icons/protein/beefpatty.png",
		title: "Beef patty"
	},
	{
		img: "/images/pantry-icons/protein/chickenwhole.png",
		title: "Chicken drum"
	}
];

export default Onboarding;

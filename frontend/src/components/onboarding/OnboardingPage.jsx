"use client";

import CardWrapper from "@/components/CardWrapper/CardWrapper";
import PantryGrid from "@/components/Pantry/PantryGrid";
import { ChevronLeft } from "@mui/icons-material";
import { Stack, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useDataStore from "@/lib/store";
import ingredients from "@/ingredients.json";
import meals from "@/meals.json";

function Onboarding() {
	const [page, setPage] = useState("meals");

	const handlePageChange = (newPage) => {
		return () => {
			setPage(newPage);
		};
	};

	return (
		<CardWrapper>
			<Stack alignItems="center" width="700px">
				{page === "ingredients" ? (
					<IngredientsPage onPageChange={handlePageChange("meals")} />
				) : (
					<MealsPage onPageChange={handlePageChange("ingredients")} />
				)}
			</Stack>
		</CardWrapper>
	);
}

function MealsPage({ onPageChange }) {
	const { setUserFavouriteMeals, userFavouriteMeals } = useDataStore();

	const handleMealsChange = (item) => {
		if (userFavouriteMeals.includes(item)) {
			const newMeals = userFavouriteMeals.filter((meal) => meal !== item);
			setUserFavouriteMeals(newMeals);
		} else {
			setUserFavouriteMeals([...userFavouriteMeals, item]);
		}
	};

	return (
		<>
			<Stack alignItems="center">
				<Typography variant="h2" fontWeight="bold" sx={{ color: "primary.main" }}>
					Add Favourite Meals
				</Typography>
				<Typography variant="h6" textAlign="center">
					Select some meals below that you love, in order to aid with recipe generation.
				</Typography>
			</Stack>
			<Stack marginY="30px">
				<PantryGrid itemData={meals} variant="onboarding" onClick={handleMealsChange} selected={userFavouriteMeals} />
			</Stack>
			<Button variant="contained" sx={{ textTransform: "none", py: 1.5, width: "50%" }} onClick={onPageChange}>
				<Typography variant="h6">Continue</Typography>
			</Button>
		</>
	);
}

function IngredientsPage({ onPageChange }) {
	const { userIngredients, setUserIngredients } = useDataStore();
	const ingredientsOnboarding = ingredients.filter((item) => item.categories.includes("Onboarding"));
	const router = useRouter();

	const handleIngredientsChange = (item) => {
		if (userIngredients.includes(item)) {
			const newIngredients = userIngredients.filter((ingredient) => ingredient !== item);
			setUserIngredients(newIngredients);
		} else {
			setUserIngredients([...userIngredients, item]);
		}
	};

	return (
		<>
			<Stack alignItems="center">
				<Stack direction="row" alignItems="center" width="100%" justifyContent="center">
					<IconButton sx={{ height: "56px", marginRight: "44px", position: "relative" }} onClick={onPageChange}>
						<ChevronLeft sx={{ fontSize: "40px", color: "secondary.dark" }} />
					</IconButton>
					<Typography variant="h2" marginRight="100px" fontWeight="bold" sx={{ color: "primary.main" }}>
						Add Ingredients
					</Typography>
				</Stack>
				<Typography variant="h6" textAlign="center">
					Add ingredients that you have, in order to aid with recipe recommendation.
				</Typography>
			</Stack>
			<Stack marginY="30px">
				<PantryGrid
					itemData={ingredientsOnboarding}
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
	);
}

export default Onboarding;

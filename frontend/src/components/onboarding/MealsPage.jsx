"use client";

import PantryGrid from "@/components/PantryGrid";
import { Stack, Typography, Button } from "@mui/material";
import useDataStore from "@/lib/store";
import { addFavMeal, removeFavMeal } from "@/lib/dbCalls";
import { getAuth } from "firebase/auth";
import meals from "@/lib/meals.json";

export function MealsPage({ onPageChange }) {
	const { setUserFavouriteMeals, userFavouriteMeals } = useDataStore();

	const handleMealsChange = async (item) => {
		if (userFavouriteMeals.includes(item)) {
			const newMeals = userFavouriteMeals.filter((meal) => meal !== item);
			setUserFavouriteMeals(newMeals);
			removeFavMeal(await getAuth().currentUser.getIdToken(), item);
		} else {
			setUserFavouriteMeals([...userFavouriteMeals, item]);
			addFavMeal(await getAuth().currentUser.getIdToken(), item);
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

"use client";

import PantryGrid from "@/components/pantry/PantryGrid";
import { ChevronLeft } from "@mui/icons-material";
import { Stack, Typography, Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import useDataStore from "@/lib/store";
import ingredients from "@/ingredients.json";

export function IngredientsPage({ onPageChange }) {
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
					selected={userIngredients} />
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

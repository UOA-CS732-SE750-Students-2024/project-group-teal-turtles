import { Button, Paper, Typography, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import useDataStore from "@/lib/store";
import { useSearchParams } from "next/navigation";

export default function ViewMealCard() {
	const { authToken, numberOfPeople, mealToRemix, userFavouriteMeals, userDislikedIngredients, userParameters } =
		useDataStore();
	const [recipeLoaded, setLoaded] = useState(false);
	const [recipe, setRecipe] = useState("");
	const [mealName, setMealName] = useState("");
	const [ingredientsUser, setIngredientsUser] = useState("");
	const [ingredientsNeeded, setIngredientsNeeded] = useState("");
	const searchParams = useSearchParams();

	// const mealName = "Chicken and Leak Cheese Bake";
	// const ingredientsUser = "Chicken, Cheese, Milk, Leaks, Flour, Sugar";
	// const ingredientsNeeded = "Cream";

	if (searchParams.get("generateOption") === "Remix") {
		axios
			.post(
				`https://intelligent-eats.ts.r.appspot.com/api/generation/remix`,
				{
					mealToRemix: mealToRemix,
					favouriteMeals: userFavouriteMeals,
					dislikedIngredients: userDislikedIngredients,
					mealType: userParameters.mealType,
					cuisine: userParameters.cuisine,
					dietaryRequirements: userParameters.dietaryRequirements
				},
				{
					headers: {
						Authorization: authToken
					}
				}
			)
			.then((response) => {
				setMealName(response.data.mealName);
				setIngredientsUser(response.data.ingredientsNeeded);
			});
	} else if (searchParams.get("generateOption") === "Prompt") {
	} else if (searchParams.get("generateOption") === "Basic") {
	} else if (searchParams.get("generateOption") === "Strict") {
	}

	function loadRecipe() {
		setLoaded(true);
		axios
			.post(
				`https://intelligent-eats.ts.r.appspot.com/api/generation/recipe`,
				{
					mealName: mealName,
					ingredients: ingredientsUser + ingredientsNeeded,
					numberOfPeople: numberOfPeople
				},
				{
					headers: {
						Authorization: authToken
					}
				}
			)
			.then((response) => {
				setRecipe(response.data);
			});
	}
	return (
		<Paper elevation={3} align="center" sx={{ p: 4, m: 8, mt: 4, width: "50%" }}>
			<Typography variant="h2">{mealName}</Typography>
			<Stack alignItems={"flex-start"} sx={{ mt: 4 }}>
				<Typography variant="h4">Ingredients</Typography>
				<Typography variant="h6">User: {ingredientsUser}</Typography>
				{ingredientsNeeded.length > 0 && <Typography variant="h6">Needed: {ingredientsNeeded}</Typography>}
			</Stack>
			{!recipeLoaded && (
				<Button variant="contained" sx={{ mt: 4 }} size="large" onClick={loadRecipe}>
					Generate Recipe
				</Button>
			)}
			{recipeLoaded && (
				<Stack alignItems={"flex-start"} sx={{ mt: 4 }}>
					<Typography variant="h4">Recipe Generated</Typography>
					<Typography variant="h6">Recipe: {recipe}</Typography>
				</Stack>
			)}
		</Paper>
	);
}

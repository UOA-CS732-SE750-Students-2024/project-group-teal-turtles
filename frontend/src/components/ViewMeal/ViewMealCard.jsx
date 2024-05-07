import { Button, Paper, Typography, Stack, LinearProgress, CircularProgress } from "@mui/material";
import { useState, useEffect, Suspense } from "react";
import useDataStore from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import {
	addGeneratedMeal,
	saveParameters,
	generateMealLoose,
	generateRecipe,
	generateMealPrompt,
	generateMealRemix,
	generateMealStrict
} from "@/helpers/dbCalls";

export default function ViewMealCard() {
	function MealCard() {
		const {
			mealToRemix,
			userFavouriteMeals,
			userDislikedIngredients,
			userGeneratedMeals,
			setUserGeneratedMeals,
			userParameters,
			userIngredients,
			prompt
		} = useDataStore();
		const [recipe, setRecipe] = useState([]);
		const [ingredientQuantities, setIngredientQuantities] = useState([]);
		const [mealName, setMealName] = useState("");
		const [ingredientsUser, setIngredientsUser] = useState([]);
		const [ingredientsNeeded, setIngredientsNeeded] = useState([]);
		const searchParams = useSearchParams();
		const [mealLoaded, setMealLoaded] = useState(false);
		const [recipeLoaded, setRecipeLoaded] = useState(false);

		useEffect(() => {
			try {
				async function fetchMeal() {
					const authToken = await getAuth().currentUser.getIdToken();
					if (searchParams.get("generateOption") === "Remix") {
						generateMealRemix(authToken, mealToRemix).then((res) => {
							afterResult(res.data.mealName, res.data.ingredients);
							fetchRecipe(res.data.mealName, res.data.ingredients);
						});
					} else if (searchParams.get("generateOption") === "Prompt") {
						generateMealPrompt(authToken, prompt).then((res) => {
							afterResult(res.data.mealName, res.data.ingredients);
							fetchRecipe(res.data.mealName, res.data.ingredients);
						});
					} else if (searchParams.get("generateOption") === "Basic") {
						const body = {
							favouriteMeals: userFavouriteMeals,
							generatedMeals: userGeneratedMeals,
							ingredients: userIngredients,
							dislikedIngredients: userDislikedIngredients,
							mealType: userParameters.mealType,
							cuisine: userParameters.cuisine,
							dietaryRequirements: userParameters.dietaryRequirements
						};
						generateMealLoose(authToken, body).then((res) => {
							setIngredientsNeeded(res.data.ingredientsNeeded);
							afterResult(res.data.mealName, res.data.ingredientsUser);
							fetchRecipe(res.data.mealName, res.data.ingredientsUser + res.data.ingredientsNeeded);
						});
					} else if (searchParams.get("generateOption") === "Strict") {
						const body = {
							favouriteMeals: userFavouriteMeals,
							generatedMeals: userGeneratedMeals,
							ingredients: userIngredients,
							dislikedIngredients: userDislikedIngredients,
							mealType: userParameters.mealType,
							cuisine: userParameters.cuisine,
							dietaryRequirements: userParameters.dietaryRequirements
						};
						generateMealStrict(authToken, body).then((res) => {
							afterResult(res.data.mealName, res.data.ingredientsUser);
							fetchRecipe(res.data.mealName, res.data.ingredientsUser);
						});
					}
				}
				fetchMeal();
			} catch (err) {
				console.log(err);
			}
		}, []);

		async function afterResult(mealName, userIngredients) {
			const authToken = await getAuth().currentUser.getIdToken();

			setMealName(mealName);
			setIngredientsUser(userIngredients);

			saveParameters(authToken, userParameters);
			addGeneratedMeal(authToken, mealName);

			setUserGeneratedMeals([...userGeneratedMeals, mealName]);
			setMealLoaded(true);
		}

		async function fetchRecipe(mealName, ingredients) {
			const authToken = await getAuth().currentUser.getIdToken();
			const body = { mealName: mealName, ingredients: ingredients, numberOfPeople: userParameters.numberOfPeople };
			generateRecipe(authToken, body).then((res) => {
				setRecipe(res.data.steps);
				setIngredientQuantities(res.data.ingredientQuantities);
				setRecipeLoaded(true);
			});
		}

		return (
			<Paper elevation={4} align="center" sx={{ p: 4, m: 8, mt: 4, width: "50%" }}>
				{!mealLoaded && (
					<>
						<Typography variant="h4" align="center">
							Generating a delicious meal...
						</Typography>
						<LinearProgress sx={{ mt: 4 }} />
					</>
				)}
				{mealLoaded && (
					<>
						<Typography variant="h2">{mealName}</Typography>
						<Stack alignItems={"flex-start"} sx={{ mt: 4 }}>
							<Typography variant="h4">Ingredients</Typography>
							<Typography variant="h6">User: {ingredientsUser.join(", ")}</Typography>
							{ingredientsNeeded.length > 0 && (
								<Typography variant="h6">
									Needed: {ingredientsNeeded.join(", ")} {}
								</Typography>
							)}
						</Stack>
					</>
				)}
				{mealLoaded && !recipeLoaded && <CircularProgress sx={{ mt: 4 }} size={50} />}

				{recipeLoaded && (
					<Stack alignItems={"flex-start"} sx={{ mt: 4 }} direction={"row"}>
						<Stack alignItems={"flex-start"} sx={{ mr: 4 }}>
							<Typography variant="h4">Quantities</Typography>
							{ingredientQuantities.map((ingredient, index) => (
								<Typography key={index} variant="h6">
									{ingredient}
								</Typography>
							))}
						</Stack>
						<Stack alignItems={"flex-start"}>
							<Typography variant="h4">Instructions</Typography>
							{recipe.map((step, index) => (
								<Typography key={index} variant="h6">
									{step}
								</Typography>
							))}
						</Stack>
					</Stack>
				)}
			</Paper>
		);
	}
	return (
		<Suspense>
			<MealCard />
		</Suspense>
	);
}

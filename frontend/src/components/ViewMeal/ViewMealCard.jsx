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
			numberOfPeople,
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
		const [recipeLoadedStarted, setRecipeLoadedStarted] = useState(false);
		const [recipeLoaded, setRecipeLoaded] = useState(false);

		useEffect(() => {
			async function fetchMeal() {
				const authToken = await getAuth().currentUser.getIdToken();
				if (searchParams.get("generateOption") === "Remix") {
					generateMealRemix(authToken, mealToRemix).then((res) => {
						afterResult(res.data.mealName, userParameters);
					});
				} else if (searchParams.get("generateOption") === "Prompt") {
					generateMealPrompt(authToken, prompt).then((res) => {
						afterResult(res.data.mealName, userParameters);
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
						afterResult(res.data.mealName, userParameters);
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
						afterResult(res.data.mealName, userParameters);
					});
				}
			}

			fetchMeal();
		}, []);

		async function loadRecipe() {
			const authToken = await getAuth().currentUser.getIdToken();
			setRecipeLoadedStarted(true);
			generateRecipe(authToken, mealName, ingredientsUser + ingredientsNeeded, numberOfPeople).then((data) => {
				setRecipe(data.steps);
				setIngredientQuantities(data.ingredientQuantities);
				setRecipeLoaded(true);
			});
		}

		async function afterResult(data, userParameters) {
			const authToken = await getAuth().currentUser.getIdToken();

			setMealName(data.mealName);
			setIngredientsUser(data.ingredientsUser);

			saveParameters(authToken, userParameters);
			addGeneratedMeal(authToken, generatedMeal);

			setUserGeneratedMeals([...userGeneratedMeals, data.mealName]);
			setMealLoaded(true);
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

				{!recipeLoadedStarted && mealLoaded && (
					<Button variant="contained" sx={{ mt: 4 }} size="large" onClick={loadRecipe}>
						Generate Recipe
					</Button>
				)}
				{recipeLoadedStarted && !recipeLoaded && <CircularProgress sx={{ mt: 4 }} size={50} />}

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

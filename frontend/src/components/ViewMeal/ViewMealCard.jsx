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
import { useRouter } from "next/navigation";

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
			prompt,
			lastMeal,
			setLastMeal,
			lastRecipe,
			setLastRecipe,
			setLastIngredientQuantities,
			lastIngredientQuantities,
			lastIngredientsUser,
			setLastIngredientsUser,
			lastIngredientsNeeded,
			setLastIngredientsNeeded
		} = useDataStore();

		const searchParams = useSearchParams();
		const router = useRouter();
		const [mealCurrentlyGenerating, setMealCurrentlyGenerating] = useState(false);

		const url = "https://api.segmind.com/v1/sdxl1.0-txt2img";
		const api_key = process.env.NEXT_PUBLIC_SEGMIND_API_KEY;

		const data = {
			prompt:
				"4k, realistic, tasty looking dish, highly detailed, bokeh, cinemascope, moody, gorgeous, film grain, grainy, bulgogi meat on rice",
			negative_prompt: "ugly, tiling, people, blurry, blurred, unappealing",
			style: "base",
			img_width: 1024,
			img_height: 1024,
			base64: true
		};

		useEffect(() => {
			console.log(searchParams);
			if (searchParams.get("from") === "generation") {
				setMealCurrentlyGenerating(true);
				setLastMeal("");
				setLastRecipe("");
				setLastIngredientQuantities([]);
				setLastIngredientsUser([]);
				setLastIngredientsNeeded([]);
				console.log("generating");

				try {
					async function fetchMeal() {
						const authToken = await getAuth().currentUser.getIdToken();
						if (searchParams.get("generateOption") === "Remix") {
							generateMealRemix(authToken, mealToRemix)
								.then((res) => {
									afterResult(res.data.mealName, res.data.ingredients);
									fetchRecipe(res.data.mealName, res.data.ingredients);
								})
								.catch((err) => {
									console.log(err);
								});
						} else if (searchParams.get("generateOption") === "Prompt") {
							generateMealPrompt(authToken, prompt)
								.then((res) => {
									afterResult(res.data.mealName, res.data.ingredients);
									fetchRecipe(res.data.mealName, res.data.ingredients);
								})
								.catch((err) => {
									console.log(err);
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
							generateMealLoose(authToken, body)
								.then((res) => {
									setLastIngredientsNeeded(res.data.ingredientsNeeded);
									afterResult(res.data.mealName, res.data.ingredientsUser);
									fetchRecipe(res.data.mealName, res.data.ingredientsUser + res.data.ingredientsNeeded);
								})
								.catch((err) => {
									console.log(err);
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
							generateMealStrict(authToken, body)
								.then((res) => {
									afterResult(res.data.mealName, res.data.ingredientsUser);
									fetchRecipe(res.data.mealName, res.data.ingredientsUser);
								})
								.catch((err) => {
									console.log(err);
								});
						}
					}
					fetchMeal();
				} catch (err) {
					console.log(err);
				}
			}
		}, []);

		async function afterResult(mealName, userIngredients) {
			const authToken = await getAuth().currentUser.getIdToken();

			saveParameters(authToken, userParameters);
			addGeneratedMeal(authToken, mealName);

			setUserGeneratedMeals([...userGeneratedMeals, mealName]);

			setLastMeal(mealName);
			setLastIngredientsUser(userIngredients);
		}

		async function fetchRecipe(mealName, ingredients) {
			const authToken = await getAuth().currentUser.getIdToken();
			const body = { mealName: mealName, ingredients: ingredients, numberOfPeople: userParameters.numberOfPeople };
			generateRecipe(authToken, body)
				.then((res) => {
					router.replace(`/view-meal?generateOption=${searchParams.get("generateOption")}`);
					setLastRecipe(res.data.steps);
					setLastIngredientQuantities(res.data.ingredientQuantities);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		async function generateImage() {
			try {
				const response = await axios.post(url, data, { headers: { "x-api-key": api_key } });
				console.log(response.data);
			} catch (error) {
				console.error("Error:", error.response.data);
			}
		}

		return (
			<Paper elevation={4} align="center" sx={{ p: 4, m: 8, mt: 4, width: "50%" }}>
				{lastMeal === "" && mealCurrentlyGenerating && (
					<>
						<Typography variant="h4" align="center">
							Generating a delicious meal...
						</Typography>
						<LinearProgress sx={{ mt: 4 }} />
					</>
				)}

				{lastMeal === "" && !mealCurrentlyGenerating && (
					<>
						<Typography variant="h4" align="center">
							Please go to Generate to create a personalised recipe
						</Typography>
						<Button variant="contained" sx={{ mt: 4 }} onClick={() => router.push("/generation-options")}>
							Generate
						</Button>
					</>
				)}

				{lastMeal !== "" && (
					<>
						<Typography variant="h2">{lastMeal}</Typography>
						<Stack alignItems={"flex-start"} sx={{ mt: 4 }}>
							<Typography variant="h4">Ingredients</Typography>
							<Typography variant="h6">User: {lastIngredientsUser.join(", ")}</Typography>
							{lastIngredientsNeeded.length > 0 && (
								<Typography variant="h6">
									Needed: {lastIngredientsNeeded.join(", ")} {}
								</Typography>
							)}
						</Stack>
					</>
				)}
				{lastMeal !== "" && lastRecipe === "" && <CircularProgress sx={{ mt: 4 }} size={50} />}

				{lastRecipe !== "" && (
					<Stack alignItems={"flex-start"} sx={{ mt: 4 }} direction={"row"}>
						<Stack alignItems={"flex-start"} sx={{ mr: 4 }}>
							<Typography variant="h4">Quantities</Typography>
							{lastIngredientQuantities.map((ingredient, index) => (
								<Typography key={index} variant="h6">
									{ingredient}
								</Typography>
							))}
						</Stack>
						<Stack alignItems={"flex-start"}>
							<Typography variant="h4">Instructions</Typography>
							{lastRecipe.map((step, index) => (
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

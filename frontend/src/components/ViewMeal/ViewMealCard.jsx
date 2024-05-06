import { Button, Paper, Typography, Stack, LinearProgress, CircularProgress } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import useDataStore from "@/lib/store";
import { useSearchParams } from "next/navigation";

export default function ViewMealCard() {
	const {
		authToken,
		numberOfPeople,
		mealToRemix,
		userFavouriteMeals,
		userDislikedIngredients,
		userGeneratedMeals,
		setUserGeneratedMeals,
		userParameters,
		userIngredients,
		numIngredients,
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
			if (searchParams.get("generateOption") === "Remix") {
				axios
					.post(
						process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/remix",
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
						setIngredientsUser(response.data.ingredients);
						setUserGeneratedMeals([...userGeneratedMeals, response.data.mealName]);
						setMealLoaded(true);
					});
			} else if (searchParams.get("generateOption") === "Prompt") {
				axios
					.post(
						process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/prompt",
						{
							prompt: prompt
						},
						{
							headers: {
								Authorization: authToken
							}
						}
					)
					.then((response) => {
						setMealName(response.data.mealName);
						setIngredientsUser(response.data.ingredients);
						setUserGeneratedMeals([...userGeneratedMeals, response.data.mealName]);
						setMealLoaded(true);
					});
			} else if (searchParams.get("generateOption") === "Basic") {
				axios
					.post(
						process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/basicLoose",
						{
							favouriteMeals: userFavouriteMeals,
							generatedMeals: userGeneratedMeals,
							ingredients: userIngredients,
							dislikedIngredients: userDislikedIngredients,
							mealType: userParameters.mealType,
							cuisine: userParameters.cuisine,
							dietaryRequirements: userParameters.dietaryRequirements,
							numberOfAdditionalIngredients: numIngredients
						},
						{
							headers: {
								Authorization: authToken
							}
						}
					)
					.then((response) => {
						setMealName(response.data.mealName);
						setIngredientsUser(response.data.ingredientsUser);
						setIngredientsNeeded(response.data.ingredientsNeeded);
						setUserGeneratedMeals([...userGeneratedMeals, response.data.mealName]);
						setMealLoaded(true);
					});
			} else if (searchParams.get("generateOption") === "Strict") {
				axios
					.post(
						process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/basicStrict",
						{
							favouriteMeals: userFavouriteMeals,
							generatedMeals: userGeneratedMeals,
							ingredients: userIngredients,
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
						setIngredientsUser(response.data.ingredientsUser);
						setUserGeneratedMeals([...userGeneratedMeals, response.data.mealName]);
						setMealLoaded(true);
					});
			}
		}

		fetchMeal();
	}, []);

	function loadRecipe() {
		setRecipeLoadedStarted(true);
		axios
			.post(
				process.env.NEXT_PUBLIC_BACKEND_URL + "/generation/recipe",
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
				setRecipe(response.data.steps);
				setIngredientQuantities(response.data.ingredientQuantities);
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

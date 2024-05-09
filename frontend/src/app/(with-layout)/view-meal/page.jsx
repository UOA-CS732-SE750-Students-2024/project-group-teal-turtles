"use client";

import React from "react";
import { Button, Card, Typography, LinearProgress, CircularProgress, Dialog, Box } from "@mui/material";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { EmailShareButton } from "react-share";
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
import { Stack } from "@mui/material";
import useDataStore from "@/lib/store";
import Image from "next/image";
import StyledButton from "@/components/StyledButton/StyledButton";

export default function ViewMeal() {
	function View() {
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
			setLastIngredientsNeeded,
			lastMealImage,
			setLastMealImage
		} = useDataStore();

		const searchParams = useSearchParams();
		const router = useRouter();
		const [mealCurrentlyGenerating, setMealCurrentlyGenerating] = useState(false);
		const [open, setOpen] = useState(false);
		const [loading, setLoading] = useState(false);

		useEffect(() => {
			if (searchParams.get("from") === "generation") {
				setMealCurrentlyGenerating(true);
				setLastMeal("");
				setLastRecipe("");
				setLastIngredientQuantities([]);
				setLastIngredientsUser([]);
				setLastIngredientsNeeded([]);
				setLastMealImage("");

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
									console.error(err);
								});
						} else if (searchParams.get("generateOption") === "Prompt") {
							generateMealPrompt(authToken, prompt)
								.then((res) => {
									afterResult(res.data.mealName, res.data.ingredients);
									fetchRecipe(res.data.mealName, res.data.ingredients);
								})
								.catch((err) => {
									console.error(err);
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
									afterResult(res.data.mealName, res.data.ingredientsUser, res.data.ingredientsNeeded);
									fetchRecipe(res.data.mealName, res.data.ingredientsUser + res.data.ingredientsNeeded);
								})
								.catch((err) => {
									console.error(err);
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
									console.error(err);
								});
						}
					}
					fetchMeal();
				} catch (err) {
					console.error(err);
				}
			}
		}, []);

		async function afterResult(mealName, userIngredients, ingredientsNeeded) {
			const authToken = await getAuth().currentUser.getIdToken();

			saveParameters(authToken, userParameters);
			addGeneratedMeal(authToken, mealName);

			setUserGeneratedMeals([...userGeneratedMeals, mealName]);

			setLastMeal(mealName);
			setLastIngredientsUser(userIngredients);
			generateImage(mealName, userIngredients, ingredientsNeeded);
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
					console.error(err);
				});
		}

		async function generateImage(mealName, ingredientsUser, ingredientsNeeded) {
			const data = {
				prompt: `4k, realistic, tasty looking dish, highly detailed, bokeh, cinemascope, moody, gorgeous, film grain, grainy, ${
					mealName ?? ""
				} on a plate, ingredients of dish ${ingredientsUser != null ? ingredientsUser.join(" ") : ""} ${
					ingredientsNeeded != null ? ingredientsNeeded.join(" ") : ""
				},`,
				negative_prompt: "ugly, tiling, people, blurry, blurred, unappealing, background items",
				img_width: 1024,
				img_height: 1024,
				base64: true
			};

			try {
				setLoading(true);
				const response = await axios.post(process.env.NEXT_PUBLIC_SEGMIND_URL, data, {
					headers: { "x-api-key": process.env.NEXT_PUBLIC_SEGMIND_API_KEY }
				});
				setLastMealImage(response.data.image);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error("Error:", error.response.data);
			}
		}

		const [imageSize, setImageSize] = useState(0);

		useEffect(() => {
			function handleResize() {
				const windowWidth = window.innerWidth;
				const windowHeight = window.innerHeight;
				const smallerDimension = Math.min(windowWidth, windowHeight) * 0.9;
				setImageSize(smallerDimension);
			}

			handleResize();

			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}, []);

		return (
			<Stack sx={{ backgroundColor: "background.paper" }}>
				<Suspense>
					<Stack justifyContent="space-between" paddingX="20vw" minHeight="calc(100vh - 70px)">
						{lastMeal !== "" && (
							<Typography variant="h2" textAlign="center" fontWeight="700" mt="10vh" mb="5vh">
								{lastMeal}
							</Typography>
						)}
						<Card
							elevation={5}
							sx={{
								borderRadius: "80px 80px 0px 0px",
								flexGrow: 1,
								pb: "20vh",
								mt: lastMeal === "" ? "20vh" : 0
							}}
						>
							{lastMeal === "" && mealCurrentlyGenerating && (
								<Stack>
									<Typography variant="h4" align="center" sx={{ mt: 4 }}>
										Generating a delicious meal...
									</Typography>
									<LinearProgress sx={{ mt: 4 }} />
								</Stack>
							)}

							{lastMeal === "" && !mealCurrentlyGenerating && (
								<Stack alignItems="center" spacing={4} mt={4}>
									<Typography variant="h4" textAlign="center" fontWeight="bold">
										Please go to Generate to create a personalised recipe.
									</Typography>
									<Typography variant="h6" fontWeight="700" sx={{ color: "primary.main" }}>
										Your last generated recipe will show up here.
									</Typography>
									<StyledButton text="Generate" onClick={() => router.push("/generation-options")} />
								</Stack>
							)}

							{lastMeal !== "" && lastRecipe === "" && (
								<Stack alignItems="center">
									<CircularProgress sx={{ mt: 4 }} size={50} />
									<Typography variant="h3" fontWeight="bold" sx={{ color: "primary.main" }}>
										Generating recipe...
									</Typography>
								</Stack>
							)}

							{lastRecipe !== "" && (
								<Stack alignItems="center" sx={{ mt: 8 }} spacing="30px" width="100%" paddingX="4vw">
									{loading ? (
										<Stack alignItems="center" spacing="30px">
											<CircularProgress sx={{ mt: 4 }} size={50} />
											<Typography variant="h3" fontWeight="bold" sx={{ color: "primary.main" }}>
												Generating meal image...
											</Typography>
										</Stack>
									) : setLastMealImage !== "" ? (
										<Button
											variant="contained"
											sx={{ p: 1, borderRadius: 4 }}
											onClick={() => {
												setOpen(true);
											}}
										>
											<Image
												src={lastMealImage !== "" ? `data:image/png;base64,${lastMealImage}` : ""}
												width={384}
												height={384}
												alt="Generated depiction of the meal"
												style={{ borderRadius: 8 }}
											/>
										</Button>
									) : (
										<></>
									)}
									<Stack alignItems="center">
										<Typography variant="h4" fontWeight="700">
											Ingredients
										</Typography>
										{lastIngredientQuantities.map((ingredient, index) => (
											<Typography textAlign="center" key={index} variant="h5">
												{ingredient}
											</Typography>
										))}
									</Stack>
									<Stack alignItems="center">
										<Typography variant="h4" fontWeight="700">
											Instructions
										</Typography>
										{lastRecipe.map((step, index) => (
											<Typography textAlign="center" key={index} variant="h5">
												{step}
											</Typography>
										))}
									</Stack>
									<Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main" }} textAlign="center">
										DISCLAIMER: This recipe and the image are AI-generated and has not been verified for accuracy or
										safety. It may contain errors. Always use your best judgement when making AI-generated dishes.
									</Typography>
								</Stack>
							)}

							{lastMeal !== "" && (
								<Stack alignItems="center" paddingX="4vw">
									<Stack textAlign="center" sx={{ mt: 4 }}>
										<Typography variant="h6" fontWeight="700">
											Ingredients needed from Pantry: {lastIngredientsUser.join(", ")}
										</Typography>
										{lastIngredientsNeeded.length > 0 && (
											<Typography variant="h6" fontWeight="700">
												Ingredients needed outside Pantry: {lastIngredientsNeeded.join(", ")} {}
											</Typography>
										)}

										{lastMealImage !== "" && lastMeal !== "" && lastRecipe !== "" && (
											<EmailShareButton
												url="IntelligentEats.com"
												subject={`Take a look at the ${lastMeal} Recipe I generated from Intelligent Eats.`}
												body={`Meal Name: ${lastMeal}\n\nIngredients:\n${lastIngredientQuantities.join(
													"\n"
												)}\n\nInstructions:\n${lastRecipe.join("\n")}`}
											>
												<StyledButton text="Share" sx={{ mt: 4 }} />
											</EmailShareButton>
										)}
									</Stack>
								</Stack>
							)}
						</Card>
					</Stack>
				</Suspense>
				<Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
					<Stack
						sx={{
							width: imageSize + "px",
							height: imageSize + "px",
							position: "relative",
							overflow: "hidden",
							margin: "auto"
						}}
					>
						<Image
							src={lastMealImage !== "" ? `data:image/png;base64,${lastMealImage}` : ""}
							width={imageSize}
							height={imageSize}
							layout="responsive"
							alt="Generated depiction of the meal"
						/>
					</Stack>
				</Dialog>
			</Stack>
		);
	}

	return (
		<Suspense>
			<View />
		</Suspense>
	);
}

"use client";

import React from "react";
import { Button, Card, Typography, LinearProgress, CircularProgress, Dialog, Box, Divider } from "@mui/material";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { EmailShareButton } from "react-share";
import {
	addGeneratedMeal,
	addFavMeal,
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
			setUserFavouriteMeals,
			userDislikedIngredients,
			userGeneratedMeals,
			setUserGeneratedMeals,
			userParameters,
			userIngredients,
			prompt,
			setPrompt,
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
			if (searchParams.get("from") === "generation" || searchParams.get("from") === "profile") {
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
							console.log(prompt);
							generateMealPrompt(authToken, prompt)
								.then((res) => {
									afterResult(res.data.mealName, res.data.ingredients);
									fetchRecipe(res.data.mealName, res.data.ingredients);
									setPrompt("");
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

			if (!userGeneratedMeals.includes(mealName)) {
				saveParameters(authToken, userParameters);
				addGeneratedMeal(authToken, mealName);
				setUserGeneratedMeals([...userGeneratedMeals, mealName]);
			}

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

		async function addToFavourites() {
			if (!userFavouriteMeals.includes(lastMeal)) {
				const authToken = await getAuth().currentUser.getIdToken();
				setUserFavouriteMeals([...userFavouriteMeals, lastMeal]);
				addFavMeal(authToken, lastMeal);
			}
		}

		// Dynamic sizing for enlarged image
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
			<Stack sx={{ backgroundColor: "background.paper" }} alignItems="center">
				<Suspense>
					<Stack justifyContent="space-between" minHeight="calc(100vh - 70px)" width="100%" maxWidth="lg">
						<Typography
							variant="h2"
							textAlign="center"
							fontWeight="bold"
							mt="5vh"
							mb="5vh"
							mx="50px"
							sx={{ color: "primary.main" }}
						>
							{lastMeal === "" && !mealCurrentlyGenerating ? "Last Generated Recipe" : lastMeal}
						</Typography>
						<Card
							elevation={5}
							sx={{
								borderRadius: "80px 80px 0px 0px",
								flexGrow: 1,
								pb: "20vh"
							}}
						>
							{lastMeal === "" && !mealCurrentlyGenerating && (
								<Stack alignItems="center">
									<Typography variant="h5" align="center" my={7}>
										Please go to Generate to create a personalised recipe.
									</Typography>

									<StyledButton
										text="Generate"
										onClick={() => router.push("/generation-options?generateOption=Basic")}
									/>
								</Stack>
							)}

							{((lastMeal === "" && mealCurrentlyGenerating) || (lastMeal !== "" && lastRecipe === "")) && (
								<Stack alignItems="center">
									<CircularProgress sx={{ my: 7 }} size={50} />
									<Typography variant="h3" fontWeight="bold" sx={{ color: "primary.main" }}>
										Generating recipe...
									</Typography>
								</Stack>
							)}

							{lastRecipe !== "" && (
								<Stack alignItems="center" sx={{ mt: 8 }} spacing="30px" paddingX="4vw">
									{loading ? (
										<Stack alignItems="center" spacing="30px">
											<CircularProgress sx={{ mt: 4 }} size={50} />
											<Typography variant="h3" fontWeight="bold" sx={{ color: "primary.main" }}>
												Generating meal image...
											</Typography>
										</Stack>
									) : setLastMealImage !== "" ? (
										<Stack direction="row" sx={{ display: "flex", alignItems: "center" }} width="100%">
											<Button
												variant="contained"
												sx={{ p: 1, borderRadius: 4, width: 400, height: 400 }}
												onClick={() => {
													setOpen(true);
												}}
												flex={0}
											>
												<Image
													src={lastMealImage !== "" ? `data:image/png;base64,${lastMealImage}` : ""}
													width={384}
													height={384}
													alt="Generated depiction of the meal"
													style={{ borderRadius: 8 }}
												/>
											</Button>
											<Stack flex={1} paddingX="4vw" spacing={3}>
												<Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main" }}>
													Ingredients {lastIngredientsNeeded.length > 0 && "needed from Pantry"}
													<Typography variant="h6" sx={{ color: "black" }}>
														{lastIngredientsUser.join(", ")}
													</Typography>
												</Typography>
												{lastIngredientsNeeded.length > 0 && (
													<Typography variant="h6" fontWeight="bold" sx={{ color: "primary.main" }}>
														Ingredients needed outside Pantry
														<Typography variant="h6" sx={{ color: "black" }}>
															{lastIngredientsNeeded.join(", ")}
														</Typography>
													</Typography>
												)}
											</Stack>
										</Stack>
									) : (
										<></>
									)}
									<Divider orientation="horizontal" variant="middle" width="90%" paddingX={10} />
									<Stack
										direction="row"
										sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}
										divider={<Divider orientation="vertical" flexItem />}
										spacing={8}
									>
										<Stack alignItems="center" flex={2}>
											<Typography variant="h5" fontWeight="bold" sx={{ color: "primary.main" }}>
												Ingredients
											</Typography>
											{lastIngredientQuantities.map((ingredient, index) => (
												<Typography textAlign="start" width="100%" key={index} variant="h6" py={1}>
													- {ingredient}
												</Typography>
											))}
										</Stack>
										<Stack alignItems="center" flex={5}>
											<Typography variant="h5" fontWeight="bold" sx={{ color: "primary.main" }}>
												Instructions
											</Typography>
											{lastRecipe.map((step, index) => (
												<Typography textAlign="start" width="100%" key={index} variant="h6" py={1}>
													{step}
												</Typography>
											))}
										</Stack>
									</Stack>

									<Divider orientation="horizontal" variant="middle" width="90%" paddingX={10} />

									<Typography
										fontWeight="bold"
										sx={{ color: "primary.main", p: 1, borderRadius: 1 }}
										textAlign="center"
									>
										DISCLAIMER: This recipe and the image are AI-generated and has not been verified for accuracy or
										safety. It may contain errors. Always use your best judgement when making AI-generated dishes.
									</Typography>
								</Stack>
							)}

							{lastMeal !== "" && (
								<Stack alignItems="center" paddingX="4vw">
									<Stack textAlign="center" sx={{ mt: 4 }}>
										{lastMealImage !== "" && lastMeal !== "" && lastRecipe !== "" && (
											<Stack direction="row" spacing={4}>
												<EmailShareButton
													url="IntelligentEats.com"
													subject={`Take a look at the ${lastMeal} Recipe I generated from Intelligent Eats.`}
													body={`Meal Name: ${lastMeal}\n\nIngredients:\n${lastIngredientQuantities.join(
														"\n"
													)}\n\nInstructions:\n${lastRecipe.join("\n")}`}
												>
													<StyledButton text="Share" />
												</EmailShareButton>
												<StyledButton
													text="Add to Favourites"
													onClick={addToFavourites}
													disabled={userFavouriteMeals.includes(lastMeal)}
												/>
											</Stack>
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

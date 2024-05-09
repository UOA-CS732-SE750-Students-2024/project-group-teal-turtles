"use client";

import { useRouter } from "next/navigation";
import { TextField, Typography, Button, MenuItem, Select, IconButton, Stack, Tooltip, Card, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import useDataStore from "@/lib/store";
import { Suspense } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ExpandMore } from "@mui/icons-material";
import StyledButton from "@/components/StyledButton";

/**
 * GenerationOptionsPage component renders the page for generating recipe options based on user preferences.
 * @returns {JSX.Element} A React JSX element representing the generation options page.
 */
function GenerationOptionsPage() {
	function Generation() {
		const router = useRouter();
		const { setUserParameters, userParameters, setPrompt, prompt, mealToRemix, setMealToRemix, userIngredients } =
			useDataStore();
		const searchParams = useSearchParams();
		const generateOptionParam = searchParams.get("generateOption");

		const options = ["Basic", "Strict", "Remix", "Prompt"];
		const mealTypes = ["Breakfast", "Lunch", "Dinner"];
		const cuisines = ["Any", "Italian", "Mexican", "Chinese", "Indian"];
		const dietaryRequirements = ["None", "Vegetarian", "Vegan", "Gluten-free", "Dairy-free"];
		const numberOfPeopleOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

		/**
		 * handleButtonClick function handles button click events for selecting generation options.
		 * @param {string} option - The selected generation option.
		 * @returns {void}
		 */
		const handleButtonClick = (option) => {
			router.push(`/generation-options?generateOption=${option}`);
		};

		/**
		 * handleGenerate function handles generation of meal based on selected options.
		 * @returns {void}
		 */
		const handleGenerate = () => {
			router.push(`/view-meal?generateOption=${generateOptionParam}&from=generation`);
		};

		/**
		 * handleKeyPress function handles key press events for generating meal based on prompt input.
		 * @param {object} e - The key press event object.
		 * @returns {void}
		 */
		const handleKeyPress = (e) => {
			if (e.key === "Enter" && prompt !== "") {
				handleGenerate();
			}
		};

		return (
			<Stack
				height="calc(100vh - 70px)"
				justifyContent="space-between"
				px="20vw"
				sx={{ backgroundColor: "background.paper" }}
			>
				<Stack alignItems="center">
					<Typography variant="h2" align="center" fontWeight="bold" mt="10vh" mb="2vh" sx={{ color: "primary.main" }}>
						Recipe Generator
					</Typography>
					<Stack direction="row" justifyContent="space-between" spacing="20px">
						{options.map((option, index) => (
							<Tooltip
								key={index}
								title={
									(!userIngredients || userIngredients.length === 0) && option === "Strict"
										? "You need to add some ingredients to your Pantry"
										: ""
								}
							>
								<Button
									fullWidth
									variant={option === generateOptionParam ? "contained" : "outlined"}
									key={index}
									onClick={
										(!userIngredients || userIngredients.length === 0) && option === "Strict"
											? () => {}
											: () => handleButtonClick(option)
									}
									sx={{
										borderRadius: "30px",
										height: "60px",
										width: "200px",
										opacity: (!userIngredients || userIngredients.length === 0) && option === "Strict" ? 0.5 : 1
									}}
								>
									<Typography variant="h5" fontWeight="bold" textTransform="none">
										{option}
									</Typography>
								</Button>
							</Tooltip>
						))}
					</Stack>
				</Stack>
				<Card
					elevation={5}
					sx={{
						borderRadius: "80px 80px 0px 0px",
						height: "60vh"
					}}
				>
					{generateOptionParam === "Prompt" ? (
						<Stack alignItems="center" spacing="25px" mt="25px">
							<Typography
								variant="h6"
								fontWeight="bold"
								width="75%"
								textAlign="center"
								sx={{ color: "secondary.main" }}
							>
								Prompt Mode allows you to generate a recipe for a meal based on a prompt. <br />
								Make sure to point out ingredients that you want to include or exclude.
							</Typography>
							<TextField
								multiline
								maxRows={8}
								variant="outlined"
								placeholder="Generate a meal..."
								onChange={(e) => setPrompt(e.target.value)}
								onKeyDown={handleKeyPress}
								value={prompt ?? ""}
								sx={{
									width: "75%",
									"& .MuiOutlinedInput-root": {
										borderRadius: 4,
										outline: "none",
										backgroundColor: "background.paper"
									}
								}}
								InputProps={{
									endAdornment: (
										<IconButton onClick={handleGenerate}>
											<ArrowForwardIcon sx={{ fontSize: "40px", color: "secondary.dark" }} />
										</IconButton>
									),
									style: { fontSize: "24px" }
								}}
								inputProps={{
									style: {
										paddingLeft: 10
									}
								}}
							/>
						</Stack>
					) : (
						<Stack alignItems="center" mb="10vh" mt="25px" spacing="25px">
							<Typography
								variant="h6"
								fontWeight="bold"
								width="75%"
								textAlign="center"
								sx={{ color: "secondary.main" }}
							>
								{generateOptionParam === "Basic"
									? "Basic Mode allows you to generate recipes based on your pantry and cuisine type."
									: generateOptionParam === "Strict"
									? "Strict Mode will not add new ingredients outside of your pantry list."
									: "Remix Mode takes a meal, figures out the ingredients in it and will generate you a new meal based on those ingredients."}
							</Typography>
							<Typography fontWeight="bold" variant="h4">
								I want a
								<Select
									value={userParameters !== null ? userParameters.mealType : ""}
									onChange={(event) => {
										setUserParameters({ ...userParameters, mealType: event.target.value });
									}}
									IconComponent={() => (
										<ExpandMore
											sx={{
												height: "36px",
												width: "36px",
												pointerEvents: "none",
												position: "absolute",
												right: 0
											}}
										/>
									)}
									sx={{
										backgroundColor: "transparent",
										color: "primary.main",
										fontSize: "34px",
										fontWeight: "bold",
										".MuiOutlinedInput-notchedOutline": { borderStyle: "none" }
									}}
								>
									{mealTypes.map((mealType, index) => (
										<MenuItem
											key={index}
											value={mealType}
											sx={{
												fontWeight: "bold",
												fontSize: "22px",
												color:
													userParameters !== null && userParameters.mealType === mealType
														? "primary.main"
														: "secondary.dark"
											}}
										>
											{mealType}
										</MenuItem>
									))}
								</Select>
								Meal, for
								<Select
									value={userParameters != null ? userParameters.numberOfPeople : ""}
									onChange={(event) => setUserParameters({ ...userParameters, numberOfPeople: event.target.value })}
									IconComponent={() => (
										<ExpandMore
											sx={{
												height: "36px",
												width: "36px",
												pointerEvents: "none",
												position: "absolute",
												right: 0
											}}
										/>
									)}
									MenuProps={{
										sx: {
											maxHeight: "400px"
										}
									}}
									sx={{
										backgroundColor: "transparent",
										color: "primary.main",
										fontSize: "34px",
										fontWeight: "bold",
										".MuiOutlinedInput-notchedOutline": { borderStyle: "none" }
									}}
								>
									{numberOfPeopleOptions.map((number, index) => (
										<MenuItem
											key={index}
											value={number}
											sx={{
												justifyContent: "center",
												fontWeight: "bold",
												fontSize: "22px",
												color:
													userParameters !== null && userParameters.numberOfPeople === number.toString()
														? "primary.main"
														: "secondary.dark"
											}}
										>
											{number}
										</MenuItem>
									))}
								</Select>
								{userParameters != null && userParameters.numberOfPeople === "1" ? "person." : "people."}
							</Typography>
							{generateOptionParam === "Remix" && (
								<TextField
									placeholder="Meal to Remix"
									value={mealToRemix !== "" ? mealToRemix : ""}
									onChange={(e) => setMealToRemix(e.target.value)}
									InputProps={{
										sx: {
											borderRadius: "30px",
											fontSize: "24px",
											height: "60px",
											px: "20px"
										}
									}}
									sx={{ width: "75%" }}
								/>
							)}
							<Stack direction="row" width="75%" spacing="25px">
								<Stack width="75%">
									<Typography fontWeight="bold" ml={4} mb={0.5}>
										Cuisine Type
									</Typography>
									<Select
										value={userParameters && userParameters.cuisine !== "" ? userParameters.cuisine : ""}
										onChange={(event) => setUserParameters({ ...userParameters, cuisine: event.target.value })}
										IconComponent={() => (
											<ExpandMore
												sx={{
													height: "36px",
													width: "36px",
													pointerEvents: "none",
													position: "absolute",
													right: 15
												}}
											/>
										)}
										sx={{
											height: "60px",
											borderRadius: "30px",
											px: "20px",
											fontSize: "24px",
											fontWeight: "bold"
										}}
									>
										{cuisines.map((cuisine, index) => (
											<MenuItem key={index} value={cuisine} sx={{ fontWeight: "bold", fontSize: "18px" }}>
												{cuisine}
											</MenuItem>
										))}
									</Select>
								</Stack>
								<Stack width="75%">
									<Typography fontWeight="bold" ml={4} mb={0.5}>
										Dietary Requirements
									</Typography>
									<Select
										value={
											userParameters && userParameters.dietaryRequirements !== ""
												? userParameters.dietaryRequirements
												: ""
										}
										onChange={(event) =>
											setUserParameters({ ...userParameters, dietaryRequirements: event.target.value })
										}
										IconComponent={() => (
											<ExpandMore
												sx={{
													height: "36px",
													width: "36px",
													pointerEvents: "none",
													position: "absolute",
													right: 15
												}}
											/>
										)}
										sx={{
											height: "60px",
											borderRadius: "30px",
											px: "20px",
											fontSize: "24px",
											fontWeight: "bold"
										}}
									>
										{dietaryRequirements.map((requirement, index) => (
											<MenuItem key={index} value={requirement} sx={{ fontWeight: "bold", fontSize: "18px" }}>
												{requirement}
											</MenuItem>
										))}
									</Select>
								</Stack>
							</Stack>
							{(generateOptionParam === "Basic" || generateOptionParam === "Strict") && (
								<Stack alignItems="center">
									<Button onClick={() => router.push("/pantry")}>
										<Typography variant="h6" textTransform="none">
											Edit your ingredients from your Pantry
										</Typography>
									</Button>
									<Tooltip title="Disliked ingaredients will not be included in the generated meal">
										<Button onClick={() => router.push("/edit-profile")}>
											<Typography variant="h6" textTransform="none">
												Edit your disliked ingredients from your Profile
											</Typography>
										</Button>
									</Tooltip>
								</Stack>
							)}

							{(userIngredients && userIngredients.length > 0) || generateOptionParam !== "Strict" ? (
								<StyledButton text="Generate Meal!" onClick={handleGenerate} />
							) : (
								<Box sx={{ opacity: 0.5 }}>
									<StyledButton text="Generate Meal!" onClick={() => {}} />
								</Box>
							)}
						</Stack>
					)}
				</Card>
			</Stack>
		);
	}

	return (
		<Suspense>
			<Generation />
		</Suspense>
	);
}
export default GenerationOptionsPage;

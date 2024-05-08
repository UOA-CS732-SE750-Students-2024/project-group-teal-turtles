"use client";

import { useRouter } from "next/navigation";
import { TextField, Typography, Button, MenuItem, Select, IconButton, Stack, Tooltip, Card } from "@mui/material";
import { useSearchParams } from "next/navigation";
import useDataStore from "@/lib/store";
import { Suspense } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ExpandMore } from "@mui/icons-material";

function GenerationOptions() {
	function Generation() {
		const router = useRouter();
		const { setUserParameters, userParameters, setPrompt, prompt, mealToRemix, setMealToRemix } = useDataStore();
		const searchParams = useSearchParams();
		const generateOptionParam = searchParams.get("generateOption");

		const options = ["Basic", "Strict", "Remix", "Prompt"];
		const mealTypes = ["Breakfast", "Lunch", "Dinner"];
		const cuisines = ["Any", "Italian", "Mexican", "Chinese", "Indian"];
		const dietaryRequirements = ["None", "Vegetarian", "Vegan", "Gluten-free", "Dairy-free"];
		const numberOfPeopleOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

		const handleButtonClick = (option) => {
			router.push(`/generation-options?generateOption=${option}`);
		};

		const handleGenerate = () => {
			if (prompt !== "") {
				router.push(`/view-meal?generateOption=${generateOptionParam}&from=generation`);
			}
		};

		const handleKeyPress = (e) => {
			if (e.key === "Enter" && prompt !== "") {
				handleGenerate();
			}
		};

		return (
			<Stack height="calc(100vh - 70px)" justifyContent="space-between" paddingX="20vw">
				<Stack alignItems="center">
					<Typography variant="h2" align="center" fontWeight="700" mt="10vh" mb="2vh">
						Recipe Generator
					</Typography>
					<Stack direction="row" justifyContent="space-between" spacing="20px">
						{options.map((option, index) => (
							<Button
								fullWidth
								variant={option === generateOptionParam ? "contained" : "outlined"}
								key={index}
								onClick={() => handleButtonClick(option)}
								sx={{
									borderRadius: "30px",
									height: "60px",
									width: "200px"
								}}
							>
								<Typography variant="h5" fontWeight="bold" textTransform="none">
									{option}
								</Typography>
							</Button>
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
										backgroundColor: "#FFFFFF"
									}
								}}
								InputProps={{
									endAdornment: (
										<IconButton onClick={handleGenerate}>
											<ArrowForwardIcon sx={{ fontSize: "40px", color: "black" }} />
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
							<Typography fontWeight="700" variant="h4">
								I want a
								<Select
									value={userParameters !== null ? userParameters.mealType : ""}
									onChange={(event) => {
										setUserParameters({ ...userParameters, mealType: event.target.value.toLowerCase() });
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
										".MuiOutlinedInput-notchedOutline": { borderStyle: "none" }
									}}
								>
									{mealTypes.map((mealType, index) => (
										<MenuItem
											key={index}
											value={mealType.toLowerCase()}
											sx={{
												color:
													userParameters !== null && userParameters.mealType.toLowerCase() === mealType.toLowerCase()
														? "primary.main"
														: "secondary.dark"
											}}
										>
											<Typography variant="h4" fontWeight="bold">
												{mealType}
											</Typography>
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
									sx={{
										backgroundColor: "transparent",
										color: "primary.main",
										".MuiOutlinedInput-notchedOutline": { borderStyle: "none" }
									}}
								>
									{numberOfPeopleOptions.map((number, index) => (
										<MenuItem key={index} value={number}>
											<Typography variant="h4" fontWeight="bold">
												{number}
											</Typography>
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
											borderRadius: "30px",
											paddingX: "20px"
										}
									}}
									sx={{ width: "75%" }}
								/>
							)}
							<Stack direction="row" width="75%" spacing="25px">
								<Select
									value={userParameters && userParameters.cuisine !== "" ? userParameters.cuisine : ""}
									onChange={(event) => setUserParameters({ ...userParameters, cuisine: event.target.value })}
									IconComponent={() => <ExpandMore sx={{ height: "36px", width: "36px" }} />}
									sx={{ width: "75%", height: "60px", borderRadius: "30px", paddingX: "20px", fontSize: "24px" }}
								>
									{cuisines.map((cuisine, index) => (
										<MenuItem key={index} value={cuisine}>
											{cuisine}
										</MenuItem>
									))}
								</Select>
								<Select
									value={
										userParameters && userParameters.dietaryRequirements !== ""
											? userParameters.dietaryRequirements
											: ""
									}
									onChange={(event) =>
										setUserParameters({ ...userParameters, dietaryRequirements: event.target.value })
									}
									IconComponent={() => <ExpandMore sx={{ height: "36px", width: "36px" }} />}
									sx={{ width: "75%", height: "60px", borderRadius: "30px", paddingX: "20px", fontSize: "24px" }}
								>
									{dietaryRequirements.map((requirement, index) => (
										<MenuItem key={index} value={requirement}>
											{requirement}
										</MenuItem>
									))}
								</Select>
							</Stack>
							<Stack alignItems="center">
								<Button onClick={() => router.push("/pantry")}>
									<Typography variant="h6" textTransform="none">
										Edit your ingredients from your Pantry:
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
							<Button
								variant="contained"
								onClick={handleGenerate}
								sx={{ width: "200px", height: "60px", borderRadius: "30px" }}
							>
								<Typography textTransform="none" variant="h6">
									Generate Meal!
								</Typography>
							</Button>
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

export default GenerationOptions;

"use client";

import { useRouter } from "next/navigation";
import {
	Box,
	TextField,
	Typography,
	Button,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	IconButton,
	Stack,
	Tooltip
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import useDataStore from "@/lib/store";
import { Suspense } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function GenerationOptions() {
	function Generation() {
		const router = useRouter();
		const { setUserParameters, userParameters, setPrompt, prompt, mealToRemix, setMealToRemix } = useDataStore();
		const searchParams = useSearchParams();
		const generateOptionParam = searchParams.get("generateOption");

		const options = ["Basic", "Strict", "Remix", "Prompt"];
		const mealTypes = ["Breakfast", "Lunch", "Dinner"];
		const cuisines = ["Italian", "Mexican", "Chinese", "Indian", "Any"];
		const dietaryRequirements = ["none", "Vegetarian", "Vegan", "Gluten-free", "Dairy-free"];
		const numberOfPeopleOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

		const handleButtonClick = (option) => {
			router.push(`/generation-options?generateOption=${option}`);
		};

		const handleGenerate = () => {
			if (prompt !== "") {
				router.push(`/view-meal?generateOption=${generateOptionParam}`);
			}
		};

		const handleKeyPress = (e) => {
			if (e.key === "Enter" && prompt !== "") {
				handleGenerate();
			}
		};

		return (
			<Stack height="calc(100vh - 70px)" justifyContent="space-between" paddingX="20vw">
				<Typography variant="h2" align="center" fontWeight="700">
					Recipe Generator
				</Typography>
				<Stack direction="row" justifyContent="space-between" spacing="20px">
					{options.map((option, index) => (
						<Button
							fullWidth
							variant={option === generateOptionParam ? "contained" : "outlined"}
							key={index}
							onClick={() => handleButtonClick(option)}
							sx={{ borderRadius: "20px", height: "80px" }}
						>
							<Typography variant="h5" fontWeight="bold" textTransform="none">
								{option}
							</Typography>
						</Button>
					))}
				</Stack>
				{generateOptionParam === "Prompt" ? (
					<Box>
						<TextField
							variant="outlined"
							placeholder="Search for a meal..."
							onChange={(e) => setPrompt(e.target.value)}
							onKeyDown={handleKeyPress}
							value={prompt ?? ""}
							sx={{
								width: "100%",
								"& .MuiOutlinedInput-root": {
									mt: "6vh",
									borderRadius: 4,
									outline: "none",
									backgroundColor: "#FFFFFF",
									"& input": {
										fontSize: "40px",
										ml: 2
									}
								}
							}}
							InputProps={{
								endAdornment: (
									<IconButton onClick={handleGenerate}>
										<ArrowForwardIcon sx={{ fontSize: "40px", color: "black" }} />
									</IconButton>
								)
							}}
						/>
					</Box>
				) : (
					<Box>
						{generateOptionParam === "Remix" && (
							<TextField
								sx={{ width: "75%", mb: "2vh" }}
								label="Meal to remix"
								value={mealToRemix !== "" ? mealToRemix : ""}
								onChange={(e) => setMealToRemix(e.target.value)}
							/>
						)}

						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography variant="h5" gutterBottom>
								Number of People:
							</Typography>
							<FormControl variant="outlined" sx={{ width: "8%", ml: "2vh" }}>
								<Select
									value={userParameters !== null ? userParameters.numberOfPeople : ""}
									onChange={(event) => setUserParameters({ ...userParameters, numberOfPeople: event.target.value })}
								>
									{numberOfPeopleOptions.map((number, index) => (
										<MenuItem key={index} value={number}>
											{number}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>

						<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
							<Typography variant="h5" sx={{ marginRight: 2 }}>
								Meal Type:
							</Typography>
							<Stack direction="row" justifyContent="space-between" spacing="20px">
								{mealTypes.map((mealType, index) => (
									<Button
										fullWidth
										variant={
											userParameters !== null && mealType.toLocaleLowerCase() === userParameters.mealType.toLowerCase()
												? "contained"
												: "outlined"
										}
										key={index}
										onClick={() => setUserParameters({ ...userParameters, mealType: mealType })}
										sx={{ borderRadius: "20px", height: "80px" }}
									>
										<Typography variant="h5" fontWeight="bold" textTransform="none">
											{mealType}
										</Typography>
									</Button>
								))}
							</Stack>
						</Box>

						<FormControl variant="outlined" sx={{ width: "75%", mt: "2vh" }}>
							<InputLabel id="cuisine-type-label">Cuisine Type</InputLabel>
							<Select
								labelId="cuisine-type-label"
								label="Cuisine Type"
								value={userParameters && userParameters.cuisine !== "" ? userParameters.cuisine : ""}
								onChange={(event) => setUserParameters({ ...userParameters, cuisine: event.target.value })}
							>
								{cuisines.map((cuisine, index) => (
									<MenuItem key={index} value={cuisine}>
										{cuisine}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl variant="outlined" sx={{ width: "75%", mt: "2vh" }}>
							<InputLabel id="dietary-requirements-label">Dietary Requirements</InputLabel>
							<Select
								labelId="dietary-requirements-label"
								label="Dietary Requirements"
								value={
									userParameters && userParameters.dietaryRequirements !== "" ? userParameters.dietaryRequirements : ""
								}
								onChange={(event) => setUserParameters({ ...userParameters, dietaryRequirements: event.target.value })}
							>
								{dietaryRequirements.map((requirement, index) => (
									<MenuItem key={index} value={requirement}>
										{requirement}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<Box sx={{ display: "flex", alignItems: "center", mt: "3vh" }}>
							<Typography variant="h5" sx={{ marginRight: 2 }}>
								Edit your ingredients from your Pantry:
							</Typography>
							<Button variant="contained" onClick={() => router.push("/pantry")}>
								Pantry
							</Button>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", mt: "3vh" }}>
							<Typography variant="h5" sx={{ marginRight: 2 }}>
								Edit your disliked ingredients from your profile:
							</Typography>
							<Button variant="contained" onClick={() => router.push("/edit-profile")}>
								Profile
							</Button>
							<Tooltip title="Disliked ingaredients will not be included in the generated meal">
								<IconButton color="primary" aria-label="more info">
									<InfoOutlinedIcon />
								</IconButton>
							</Tooltip>
						</Box>

						<Button variant="contained" sx={{ pr: "7vh", pl: "7vh", mt: "3vh" }} onClick={handleGenerate}>
							Generate
						</Button>
					</Box>
				)}
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

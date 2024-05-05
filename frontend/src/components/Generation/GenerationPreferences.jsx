import {
	Box,
	TextField,
	IconButton,
	Typography,
	Button,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Tooltip
} from "@mui/material";
import styles from "./GenerationPreferences.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoIcon from "@mui/icons-material/Info";
import MealTypeButtons from "./MealTypeButtons";
import useDataStore from "@/lib/store";
import { useRouter } from "next/navigation";

function GenerationPreferences({ generateOptionParam }) {
	const cuisines = ["Italian", "Mexican", "Chinese", "Indian", "Any"];
	const dietaryRequirements = ["none", "Vegetarian", "Vegan", "Gluten-free", "Dairy-free"];
	const numberOfPeopleOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
	const numberOfIngredientsOptions = ["3", "4", "5", "6+"];
	const {
		setUserParameters,
		userParameters,
		authToken,
		setPrompt,
		prompt,
		numIngredients,
		setNumIngredients,
		mealToRemix,
		setMealToRemix
	} = useDataStore();
	const router = useRouter();

	const handleGenerate = () => {
		router.push(`/view-meal?generateOption=${generateOptionParam}`);
	};
	return generateOptionParam === "Prompt" ? (
		<Box className={styles.centeredBox}>
			<TextField
				variant="outlined"
				placeholder="Search for a meal..."
				onChange={(e) => setPrompt(e.target.value)}
				value={prompt !== "" ? prompt : ""}
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
						<IconButton>
							<ArrowForwardIcon sx={{ fontSize: "40px", color: "black" }} />
						</IconButton>
					)
				}}
			/>
		</Box>
	) : (
		<Box className={styles.preferenceBox}>
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
				<MealTypeButtons />
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
					value={userParameters && userParameters.dietaryRequirements !== "" ? userParameters.dietaryRequirements : ""}
					onChange={(event) => setUserParameters({ ...userParameters, dietaryRequirements: event.target.value })}
				>
					{dietaryRequirements.map((requirement, index) => (
						<MenuItem key={index} value={requirement}>
							{requirement}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{generateOptionParam === "Basic" && (
				<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
					<Typography variant="h5" sx={{ marginRight: 2 }}>
						Number of Additional Ingredients:
					</Typography>
					<FormControl variant="outlined" sx={{ width: "8%", ml: "2vh" }}>
						<Select
							value={numIngredients !== "" ? numIngredients : ""}
							onChange={(event) => setNumIngredients(event.target.value)}
						>
							{numberOfIngredientsOptions.map((number, index) => (
								<MenuItem key={index} value={number}>
									{number}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Tooltip title="How many ingredients can the meal use that you don't have in your pantry">
						<IconButton>
							<InfoIcon />
						</IconButton>
					</Tooltip>
				</Box>
			)}

			<Box sx={{ display: "flex", alignItems: "center", mt: "3vh" }}>
				<Typography variant="h5" sx={{ marginRight: 2 }}>
					Edit your ingredients in your Pantry:
				</Typography>
				<Button variant="contained" onClick={() => router.push("/pantry")}>
					Pantry
				</Button>
			</Box>

			<Button variant="contained" sx={{ pr: "7vh", pl: "7vh", mt: "3vh" }} onClick={handleGenerate}>
				Generate
			</Button>
		</Box>
	);
}

export default GenerationPreferences;

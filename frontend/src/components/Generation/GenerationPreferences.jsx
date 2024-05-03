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

function GenerationPreferences({ generateOptionParam }) {
	console.log(generateOptionParam);
	const cuisines = ["Italian", "Mexican", "Chinese", "Indian"];
	const dietaryRequirements = ["none", "Vegetarian", "Vegan", "Gluten-free", "Dairy-free"];
	const numberOfPeopleOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

	return generateOptionParam === "Prompt" ? (
		<Box className={styles.centeredBox}>
			<TextField
				variant="outlined"
				placeholder="Search for a meal..."
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
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Typography variant="h5" gutterBottom>
					Number of People:
				</Typography>
				<FormControl variant="outlined" sx={{ width: "8%", ml: "2vh" }}>
					<InputLabel id="number-of-people-label">Select</InputLabel>
					<Select labelId="number-of-people-label" label="Select" defaultValue={1}>
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
				<Select labelId="cuisine-type-label" label="Cuisine Type">
					{cuisines.map((cuisine, index) => (
						<MenuItem key={index} value={cuisine}>
							{cuisine}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl variant="outlined" sx={{ width: "75%", mt: "2vh" }}>
				<InputLabel id="dietary-requirements-label">Dietary Requirements</InputLabel>
				<Select labelId="dietary-requirements-label" label="Dietary Requirements">
					{dietaryRequirements.map((requirement, index) => (
						<MenuItem key={index} value={requirement}>
							{requirement}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
				<Typography variant="h5" sx={{ marginRight: 2 }}>
					Number of Additional Ingredients:
				</Typography>
				<TextField variant="outlined" placeholder="Enter number..." />
				<Tooltip title="How many ingredients can the meal use that you don't have in your pantry">
					<IconButton>
						<InfoIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</Box>
	);
}

export default GenerationPreferences;

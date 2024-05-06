import MealGenerationCard from "@/components/MealGenerationPanel/MealGenerationCard/MealGenerationCard";
import { Grid, Paper, Typography, Box } from "@mui/material";
import styles from "./MealGenerationPanel.module.css";
import { useRouter } from "next/navigation";

function MealGenerationPanel() {
	const handleButtonPress = (header) => {
		switch (header) {
			case "Basic":
				router.push("/generation-options?generateOption=Basic");
				break;
			case "Strict":
				router.push("/generation-options?generateOption=Strict");
				break;
			case "Remix":
				router.push("/generation-options?generateOption=Remix");
				break;
			case "Prompt":
				router.push("/generation-options?generateOption=Prompt");
				break;
			default:
				// Default redirection
				router.push("/");
				break;
		}
	};
	const router = useRouter();

	return (
		<>
			<Typography variant="h2" align="center" gutterBottom>
				Generate a Meal
			</Typography>
			{/* <Box sx={{ mb: "2vh", ml: "30vh", mr: "30vh" }}> */}
			{/* <Box sx={{ pl: "5vh", pr: "5vh" }}> */}
			<Grid container spacing={2} sx={{ mb: "2vh" }}>
				<Grid item xs={6}>
					<MealGenerationCard
						header="Basic"
						description="Will use ingredients from your pantry as well as other ingredients to generate a delicious meal"
						onClick={() => handleButtonPress("Basic")}
					/>
				</Grid>
				<Grid item xs={6}>
					<MealGenerationCard
						header="Strict"
						description="Will only use the ingredients from your pantry to generate a delicious meal"
						onClick={() => handleButtonPress("Strict")}
					/>
				</Grid>
				<Grid item xs={6}>
					<MealGenerationCard
						header="Remix"
						description="Input a favourite meal and let us surprise you with a creative twist using your ingredients"
						onClick={() => handleButtonPress("Remix")}
					/>
				</Grid>
				<Grid item xs={6}>
					<MealGenerationCard
						header="Prompt"
						description="Pass a prompt that the intelligent engine will use to design a delectable meal."
						onClick={() => handleButtonPress("Prompt")}
					/>
				</Grid>
			</Grid>
			{/* </Box> */}
			{/* </Box> */}
		</>
	);
}

export default MealGenerationPanel;

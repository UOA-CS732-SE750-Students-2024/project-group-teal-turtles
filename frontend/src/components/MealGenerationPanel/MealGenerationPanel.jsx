import MealGenerationCard from "@/components/MealGenerationPanel/MealGenerationCard/MealGenerationCard";
import { Grid, Paper, Typography } from "@mui/material";
import styles from "./MealGenerationPanel.module.css";

function MealGenerationPanel() {
	const handleButtonPress = () => {
		console.log("PLACEHOLDER FUNCTION CALLED");
	};

	return (
		<>
			<Paper>
				<Typography variant="h2" align="center" gutterBottom>
					Generate a Meal
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<MealGenerationCard
							header="Basic"
							description="Will only use the ingredients from your pantry to generate a delicious meal"
							onClick={handleButtonPress}
						/>
					</Grid>
					<Grid item xs={6}>
						<MealGenerationCard
							header="Free-Form"
							description="To step outside your comfort zone allow us to generate a meal using some additional ingredients"
							onClick={handleButtonPress}
						/>
					</Grid>
					<Grid item xs={6}>
						<MealGenerationCard
							header="Remix"
							description="Input a favourite meal and let us surprise you with a creative twist using ingredients you already have"
							onClick={handleButtonPress}
						/>
					</Grid>
					<Grid item xs={6}>
						<MealGenerationCard
							header="Prompt"
							description="Pass a prompt that the intelligent engine will use to design a delectable meal."
							onClick={handleButtonPress}
						/>
					</Grid>
				</Grid>
			</Paper>
		</>
	);
}

export default MealGenerationPanel;

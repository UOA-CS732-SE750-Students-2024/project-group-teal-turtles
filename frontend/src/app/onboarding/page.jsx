import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { Grid, Stack, Typography, Button } from "@mui/material";

function Onboarding() {
	return (
		<Stack alignItems="center">
			<Typography variant="h2">Add Favourite Meals</Typography>
			<Typography variant="h6">
				Select Meals below that you love, in order to aid with recipe recommendation.
			</Typography>
			<Grid>
				<CategoryCard text="Pizza" src="vercel.svg" onClick={() => {}} />
			</Grid>
			<Button fullWidth variant="contained" sx={{ textTransform: "none", py: 1.5 }}>
				<Typography variant="h6">Continue</Typography>
			</Button>
		</Stack>
	);
}

export default Onboarding;

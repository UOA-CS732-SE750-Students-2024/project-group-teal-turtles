import CategoryCard from "@/components/CategoryCard/CategoryCard";
import { Grid, Stack, Typography } from "@mui/material";

function Meals() {
	return (
		<Stack alignItems="center">
			<Typography variant="h2">Add Favourite Meals</Typography>
			<Typography variant="h6">
				Select Meals below that you love, in order to aid with recipe recommendation.
			</Typography>
			<Grid>
				<CategoryCard text="Pizza" src="vercel.svg" onClick={() => {}} />
			</Grid>
		</Stack>
	);
}

export default Meals;

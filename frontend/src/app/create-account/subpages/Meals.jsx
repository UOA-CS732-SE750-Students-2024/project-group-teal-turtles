import { Stack, Typography } from "@mui/material";

function Meals() {
	return (
		<Stack alignItems="center">
			<Typography variant="h2">Add Favourite Meals</Typography>
			<Typography variant="h6">
				Select Meals below that you love, in order to aid with recipe recommendation.
			</Typography>
		</Stack>
	);
}

export default Meals;

import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ViewMealCard() {
	const router = useRouter();
	const mealName = "MEAL NAME FILLER";
	const ingredientsUser = "INGREDIENTS FILLER";
	const ingredientsNeeded = "INGREDIENTS FILLER";
	// if (router.query.generationOption === "Remix") {
	// 	axios
	// 		.post(
	// 			`${process.env.BACKEND_URL}/generation/remix`,
	// 			{
	// 				mealToRemix: mealToRemix,
	// 				favouriteMeals: userFavouriteMeals,
	// 				dislikedIngredients: userDislikedIngredients,
	// 				mealType: userParameters.mealType,
	// 				cuisine: userParameters.cuisine,
	// 				dietaryRequirements: userParameters.dietaryRequirements
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: authToken
	// 				}
	// 			}
	// 		)
	// 		.then((response) => {});
	// } else if (router.query.generationOption === "Prompt") {
	// } else if (router.query.generationOption === "Basic") {
	// } else if (router.query.generationOption === "Strict") {
	// }

	return (
		<Box>
			<Paper
				elevation={3}
				sx={{ backgroundColor: "#FFFFFF", maxWidth: "calc(100vw - 560px)" }}
				alignItems="center"
				justifyContent="center"
			>
				<Typography variant="h3" sx={{ mt: 3, mb: 1 }}>
					Meal Result: {mealName}
				</Typography>
			</Paper>
		</Box>
	);
}

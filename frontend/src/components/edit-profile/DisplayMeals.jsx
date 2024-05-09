import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from "@mui/material";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { addFavMeal, removeFavMeal } from "@/lib/dbCalls";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import useDataStore from "@/lib/store";

/**
 * DisplayMeals component renders a list of meals with options to mark as favorite and view details.
 * @param {object} props - The component props.
 * @param {boolean} [props.showFavouriteOnly=false] - Flag indicating whether to display only favorite meals.
 * @param {Array} props.userFavouriteMeals - The array of user's favorite meals.
 * @param {function} props.setUserFavouriteMeals - Function to update user's favorite meals.
 * @param {Array} props.userGeneratedMeals - The array of user's generated meals.
 * @returns {JSX.Element} A React JSX element representing the list of meals.
 */

function DisplayMeals({ showFavouriteOnly = false, userFavouriteMeals, setUserFavouriteMeals, userGeneratedMeals }) {
	const meals = showFavouriteOnly ? userFavouriteMeals : userGeneratedMeals;
	const { setPrompt } = useDataStore();
	const router = useRouter();

	/**
	 * toggleFavourite toggles the favorite status of a meal.
	 * @param {string} meal - The meal to toggle favorite status for.
	 * @returns {Promise<void>} A promise that resolves after updating the favorite status.
	 */
	const toggleFavourite = async (meal) => {
		setUserFavouriteMeals(
			userFavouriteMeals.includes(meal) ? userFavouriteMeals.filter((m) => m !== meal) : [...userFavouriteMeals, meal]
		);
		userFavouriteMeals.includes(meal)
			? removeFavMeal(await getAuth().currentUser.getIdToken(), meal)
			: addFavMeal(await getAuth().currentUser.getIdToken(), meal);
	};

	function handleMealClick() {
		router.push("/view-meal?generateOption=Prompt&from=profile");
	}

	return (
		<>
			<List sx={{ width: "100%" }}>
				{meals.map((meal) => (
					<ListItem
						key={meal}
						sx={{ cursor: "pointer", "&:hover": { backgroundColor: "background.default", color: "primary.main" } }}
						onClick={() =>
							setPrompt(`Make sure the name of the meal is ${meal} and that its ingredients are correct for that meal`)
						}
					>
						<ListItemText onClick={handleMealClick} disableTypography>
							<Typography fontWeight="bold" variant="h6">
								{meal}
							</Typography>
						</ListItemText>
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="favorite"
								onClick={() => toggleFavourite(meal)}
								color={userFavouriteMeals.includes(meal) ? "warning" : "default"}
							>
								<StarRoundedIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</>
	);
}

export default DisplayMeals;

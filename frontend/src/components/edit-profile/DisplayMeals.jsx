import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from "@mui/material";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { addFavMeal, removeFavMeal } from "@/lib/dbCalls";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import useDataStore from "@/lib/store";

function DisplayMeals({
	showFavouriteOnly = false,
	userFavouriteMeals,
	setUserFavouriteMeals,
	userGeneratedMeals,
	setUserGeneratedMeals
}) {
	const meals = showFavouriteOnly ? userFavouriteMeals : userGeneratedMeals;
	const { setPrompt } = useDataStore();
	const router = useRouter();

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

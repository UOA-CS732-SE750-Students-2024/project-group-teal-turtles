import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { addFavMeal, removeFavMeal } from "@/helpers/dbCalls";
import { getAuth } from "firebase/auth";

function DisplayMeals({
	showFavouriteOnly = false,
	userFavouriteMeals,
	setUserFavouriteMeals,
	userGeneratedMeals,
	setUserGeneratedMeals
}) {
	const meals = showFavouriteOnly ? userFavouriteMeals : userGeneratedMeals;

	const toggleFavourite = async (meal) => {
		setUserFavouriteMeals(
			userFavouriteMeals.includes(meal) ? userFavouriteMeals.filter((m) => m !== meal) : [...userFavouriteMeals, meal]
		);
		userFavouriteMeals.includes(meal)
			? removeFavMeal(await getAuth().currentUser.getIdToken(), meal)
			: addFavMeal(await getAuth().currentUser.getIdToken(), meal);
	};

	const deleteMeal = (meal) => {
		setUserGeneratedMeals(userGeneratedMeals.filter((m) => m !== meal));
		setUserFavouriteMeals(userFavouriteMeals.filter((m) => m !== meal));
		//DELETE FORM HISTORY DB
	};

	return (
		<>
			<List sx={{ width: "100%" }}>
				{meals.map((meal) => (
					<ListItem key={meal}>
						<ListItemText primary={meal} />
						<ListItemSecondaryAction>
							<IconButton
								edge="end"
								aria-label="favorite"
								onClick={() => toggleFavourite(meal)}
								color={userFavouriteMeals.includes(meal) ? "warning" : "default"}
							>
								<StarRoundedIcon />
							</IconButton>
							<IconButton edge="end" aria-label="delete" onClick={() => deleteMeal(meal)}>
								<DeleteOutlineRoundedIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</>
	);
}

export default DisplayMeals;

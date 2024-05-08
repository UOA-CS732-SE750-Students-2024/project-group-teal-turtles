import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

function DisplayMeals({
	showFavouriteOnly = false,
	userFavouriteMeals,
	setUserFavouriteMeals,
	userGeneratedMeals,
	setUserGeneratedMeals
}) {
	const meals = showFavouriteOnly ? userFavouriteMeals : userGeneratedMeals;

	const toggleFavourite = (meal) => {
		setUserFavouriteMeals(
			userFavouriteMeals.includes(meal) ? userFavouriteMeals.filter((m) => m !== meal) : [...userFavouriteMeals, meal]
		);
	};

	const deleteMeal = (meal) => {
		setUserGeneratedMeals(userGeneratedMeals.filter((m) => m !== meal));
    setUserFavouriteMeals(userFavouriteMeals.filter((m) => m !== meal));
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

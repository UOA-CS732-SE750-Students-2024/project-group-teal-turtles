import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { addFavMeal, removeFavMeal } from "@/helpers/dbCalls";
import { getAuth } from "firebase/auth";
import Link from "next/link";
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
	// const router = useRouter();
	const { setPrompt } = useDataStore();

	const toggleFavourite = async (meal) => {
		setUserFavouriteMeals(
			userFavouriteMeals.includes(meal) ? userFavouriteMeals.filter((m) => m !== meal) : [...userFavouriteMeals, meal]
		);
		userFavouriteMeals.includes(meal)
			? removeFavMeal(await getAuth().currentUser.getIdToken(), meal)
			: addFavMeal(await getAuth().currentUser.getIdToken(), meal);
	};

	// const handleClick = (meal) => {
	// 	router.push(`/generate?meal=${meal}`);
	// };

	return (
		<>
			<List sx={{ width: "100%" }}>
				{meals.map((meal) => (
					<Link href={"/view-meal?generateOption=Prompt&from=profile"} key={meal}>
						<ListItem
							key={meal}
							sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0", color: "primary.main" } }}
							// onClick={handleClick(meal)}

							onClick={() =>
								setPrompt(
									`Make sure the name of the meal is ${meal} and that its ingredients are correct for that meal`
								)
							}
						>
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
							</ListItemSecondaryAction>
						</ListItem>
					</Link>
				))}
			</List>
		</>
	);
}

export default DisplayMeals;

"use client"

import IngredientSummary from "./IngredientSummary/IngredientSummary";
import ProfileSummary from "./ProfileSummary/ProfileSummary";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { Typography, Button, Box } from "@mui/material";
import useDataStore from "@/lib/store";
import QuickSearchModal from "./QuickSearch/QuickSearchModal";
import EditUserInfoModal from "./EditUserInfo/EditUserInfoModal";
import DisplayMeals from "./DisplayMeals/DisplayMeals";
import { logout } from "@/app/auth-functions";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

import { saveIngredients, setDislikedIngredient } from "@/helpers/dbCalls";

function EditProfilePage() {
	const {
		userDislikedIngredients,
		userFavouriteMeals,
		userGeneratedMeals,
		setUserGeneratedMeals,
		setUserDislikedIngredients,
		userEmail,
		userName,
		setUserName,
		setUserEmail,
		setUserFavouriteMeals,
		setUserIngredients,
		userIngredients,
		setUserParameters,
		setAuthorisedUser,
		setMealToRemix,
		setPrompt,
		setLastMeal,
		setLastRecipe,
		setLastIngredientQuantities,
		setLastIngredientsNeeded,
		setLastIngredientsUser
	} = useDataStore();

	const [isEditDislikedIngredients, setEditDislikedIngredients] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		try {
			const authToken = await getAuth().currentUser.getIdToken();
			saveIngredients(authToken, userIngredients);
			await logout();
			setUserGeneratedMeals([]);
			setUserDislikedIngredients([]);
			setUserEmail(null);
			setUserName(null);
			setUserFavouriteMeals([]);
			setUserIngredients([]);
			setUserParameters(null);
			setAuthorisedUser(null);
			setMealToRemix("");
			setPrompt("");
			setLastMeal("");
			setLastRecipe("");
			setLastIngredientQuantities([]);
			setLastIngredientsNeeded([]);
			setLastIngredientsUser([]);

			router.push("/landing");
		} catch (error) {
			console.error(error);
		}
	};

	const handleCloseDislikedIngredients = async () => {
		const authToken = await getAuth().currentUser.getIdToken();
		setEditDislikedIngredients(false);
		setDislikedIngredient(authToken, userDislikedIngredients);
	};

	return (
		<Stack width="100%" sx={{ backgroundColor: "background.paper" }}>
			<Stack
				direction="column"
				spacing={4}
				alignItems="center"
				sx={{ width: "100%", margin: "0 auto", padding: "10vh" }}
			>
				<>
					<ProfileSummary username={userName} email={userEmail} />
					<Button variant="contained" onClick={handleLogout}>
						Logout
					</Button>
				</>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<Box sx={{ display: "flex", flexDirection: "column", mr: "20vh" }}>
						<Typography variant="h5">Meal History </Typography>

						<DisplayMeals
							userFavouriteMeals={userFavouriteMeals}
							setUserFavouriteMeals={setUserFavouriteMeals}
							userGeneratedMeals={userGeneratedMeals.slice(-10).reverse()}
							setUserGeneratedMeals={setUserGeneratedMeals}
						/>
					</Box>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography variant="h5">Favourite Meals</Typography>

						<DisplayMeals
							showFavouriteOnly={true}
							userFavouriteMeals={userFavouriteMeals}
							setUserFavouriteMeals={setUserFavouriteMeals}
							userGeneratedMeals={userGeneratedMeals}
							setUserGeneratedMeals={setUserGeneratedMeals}
						/>
					</Box>
				</Box>
				<>
					<>
						<Typography variant="h5">Pantry</Typography>
						<Button
							variant="contained"
							onClick={() => {
								router.push("/pantry");
							}}
						>
							Edit
						</Button>
						<IngredientSummary ingredients={userIngredients} />
					</>
					<>
						<Typography variant="h5">Disliked Ingredients</Typography>
						<Button
							variant="contained"
							onClick={() => {
								setEditDislikedIngredients(true);
							}}
						>
							Edit
						</Button>
						<IngredientSummary ingredients={userDislikedIngredients} />
						<QuickSearchModal
							selectedIngredients={userDislikedIngredients}
							setSelectedIngredients={setUserDislikedIngredients}
							isOpen={isEditDislikedIngredients}
							handleClose={handleCloseDislikedIngredients}
						/>
					</>
				</>
			</Stack>
		</Stack>
	);
}

export default EditProfilePage;

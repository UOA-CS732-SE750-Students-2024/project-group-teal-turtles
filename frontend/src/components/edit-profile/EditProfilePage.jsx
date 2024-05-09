"use client";

import IngredientSummary from "./IngredientSummary";
import ProfileSummary from "./ProfileSummary";
import { useRouter } from "next/navigation";
import { Typography, Stack, Divider } from "@mui/material";
import useDataStore from "@/lib/store";
import QuickSearchModal from "./QuickSearch/QuickSearchModal";
import DisplayMeals from "./DisplayMeals";
import { logout } from "@/lib/auth-functions";
import { getAuth } from "firebase/auth";
import { useState } from "react";

import { saveIngredients, setDislikedIngredient } from "@/lib/dbCalls";
import StyledButton from "../StyledButton";

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
				spacing={8}
				alignItems="center"
				sx={{ width: "100%", margin: "0 auto", padding: "10vh" }}
			>
				<Stack alignItems="center" spacing={2}>
					<ProfileSummary username={userName} email={userEmail} />
					<StyledButton onClick={handleLogout} text="Logout" />
				</Stack>
				<Stack sx={{ py: 3 }}>
					<Divider orientation="horizontal" variant="middle" width="600px" />
				</Stack>
				<Stack direction="row" spacing="5vh">
					<Stack sx={{ alignItems: "center" }}>
						<Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main" }}>
							Meal History (Last 10)
						</Typography>
						<DisplayMeals
							userFavouriteMeals={userFavouriteMeals}
							setUserFavouriteMeals={setUserFavouriteMeals}
							userGeneratedMeals={userGeneratedMeals.slice(-10).reverse()}
							setUserGeneratedMeals={setUserGeneratedMeals}
						/>
					</Stack>
					{userFavouriteMeals.length !== 0 && (
						<Stack sx={{ alignItems: "center" }}>
							<Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main" }}>
								Favourite Meals
							</Typography>
							<DisplayMeals
								showFavouriteOnly={true}
								userFavouriteMeals={userFavouriteMeals}
								setUserFavouriteMeals={setUserFavouriteMeals}
								userGeneratedMeals={userGeneratedMeals}
								setUserGeneratedMeals={setUserGeneratedMeals}
							/>
						</Stack>
					)}
				</Stack>
				<Stack alignItems="center" spacing={8} width="1000px">
					<Divider orientation="horizontal" variant="middle" width="600px" />
					<Stack alignItems="center" spacing={4}>
						<Typography variant="h4" fontWeight="bold" sx={{ color: "primary.main" }}>
							Disliked Ingredients
						</Typography>
						<IngredientSummary ingredients={userDislikedIngredients} />

						<QuickSearchModal
							selectedIngredients={userDislikedIngredients}
							setSelectedIngredients={setUserDislikedIngredients}
							isOpen={isEditDislikedIngredients}
							handleClose={handleCloseDislikedIngredients}
						/>
					</Stack>
				</Stack>
				<StyledButton
					onClick={() => {
						setEditDislikedIngredients(true);
					}}
					text="Edit"
				/>
			</Stack>
		</Stack>
	);
}

export default EditProfilePage;

import IngredientSummary from "./IngredientSummary/IngredientSummary";
import ProfileSummary from "./ProfileSummary/ProfileSummary";
import { Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { Typography, Button } from "@mui/material";
import useDataStore from "@/lib/store";
import QuickSearchModal from "./QuickSearch/QuickSearchModal";
import EditUserInfoModal from "./EditUserInfo/EditUserInfoModal";
import DisplayMeals from "./DisplayMeals/DisplayMeals";
import { logout } from "@/app/auth-functions";
import { getAuth } from "firebase/auth";
import { useState } from "react";

import { saveIngredients } from "@/helpers/dbCalls";

function EditProfilePage() {
	const {
		userDislikedIngredients,
		userFavouriteMeals,
		userGeneratedMeals,
		setUserGeneratedMeals,
		setUserDislikedIngredients,
		userEmail,
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

	const [isEditProfile, setEditProfile] = useState(false);
	const [isEditUserIngredients, setEditUserIngredients] = useState(false);
	const [isEditDislikedIngredients, setEditDislikedIngredients] = useState(false);
	const router = useRouter();

	const name = userEmail.split("@")[0];

	const handleLogout = async () => {
		try {
			const authToken = await getAuth().currentUser.getIdToken();
			saveIngredients(authToken, userIngredients);
			await logout();
			setUserGeneratedMeals([]);
			setUserDislikedIngredients([]);
			setUserEmail(null);
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
			console.log("logout successful");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Stack
				direction="column"
				spacing={4}
				alignItems="center"
				sx={{ width: "40%", margin: "0 auto", padding: "10vh" }}
			>
				<>
					<ProfileSummary username={name} email={userEmail} />
					<EditUserInfoModal
						isOpen={isEditProfile}
						handleClose={() => {
							setEditProfile(false);
						}}
					/>
					<Button
						variant="contained"
						onClick={() => {
							setEditProfile(true);
						}}
					>
						Edit Profile
					</Button>
					<Button variant="contained" onClick={handleLogout}>
						Logout
					</Button>
				</>
				<>
					<Typography variant="h5">Meal History</Typography>

					<DisplayMeals
						userFavouriteMeals={userFavouriteMeals}
						setUserFavouriteMeals={setUserFavouriteMeals}
						userGeneratedMeals={userGeneratedMeals}
						setUserGeneratedMeals={setUserGeneratedMeals}
					/>
				</>
				<>
					<Typography variant="h5">Favourite Meals</Typography>

					<DisplayMeals
						showFavouriteOnly={true}
						userFavouriteMeals={userFavouriteMeals}
						setUserFavouriteMeals={setUserFavouriteMeals}
						userGeneratedMeals={userGeneratedMeals}
						setUserGeneratedMeals={setUserGeneratedMeals}
					/>
				</>
				<>
					<Typography variant="h5">Pantry</Typography>
					<Button
						variant="contained"
						onClick={() => {
							setEditUserIngredients(true);
						}}
					>
						Edit
					</Button>
					<IngredientSummary ingredients={userIngredients} />
					<QuickSearchModal
						selectedIngredients={userIngredients}
						setSelectedIngredients={setUserIngredients}
						isOpen={isEditUserIngredients}
						handleClose={() => {
							setEditUserIngredients(false);
						}}
					/>
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
						handleClose={() => {
							setEditDislikedIngredients(false);
						}}
					/>
				</>
			</Stack>
		</>
	);
}

export default EditProfilePage;

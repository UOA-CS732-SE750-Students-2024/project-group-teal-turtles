import React from "react";
import IngredientSummary from "./IngredientSummary/IngredientSummary";
import ProfileSummary from "./ProfileSummary/ProfileSummary";
import { Stack } from "@mui/system";
import { Typography, Button } from "@mui/material";
import useDataStore from "@/lib/store";
import QuickSearchModal from "./QuickSearch/QuickSearchModal";
import EditUserInfoModal from "./EditUserInfo/EditUserInfoModal";
import DisplayMeals from "./DisplayMeals/DisplayMeals";

function EditProfilePage() {
	const {
		userIngredients,
		setUserIngredients,
		userDislikedIngredients,
		setUserDislikedIngredients,
		userFavouriteMeals,
		setUserFavouriteMeals,
		userGeneratedMeals,
		setUserGeneratedMeals
	} = useDataStore();

	const [isEditProfile, setEditProfile] = React.useState(false);
	const [isEditUserIngredients, setEditUserIngredients] = React.useState(false);
	const [isEditDislikedIngredients, setEditDislikedIngredients] = React.useState(false);

	const handleLogout = () => {
		console.log("LOGOUT CODE HERE");
	};

	const initializeMeals = () => {
		setUserFavouriteMeals(["horse"]);
		setUserGeneratedMeals(["horse", "tumors", "after", "eating", "the", "meals", "from", "here"]);
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
					<ProfileSummary />
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
				<Button onClick={initializeMeals}>INITIALIZE MEAL HISTORY AND FAVOURITES</Button>
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

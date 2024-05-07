import React from "react";
import IngredientSummary from "../IngredientSummary/IngredientSummary";
import ProfileSummary from "../ProfileSummary/ProfileSummary";
import { Stack } from "@mui/system";
import { Typography, Button } from "@mui/material";

function EditProfilePage() {
	const handleLogout = () => {
		console.log("LOGOUT HERE");
	};

	return (
		<>
			<Stack
				direction="column"
				spacing={4}
				alignItems="center"
				sx={{ width: "40%", margin: "0 auto", padding: "10vh" }}
			>
				<ProfileSummary />
				<Button variant="contained" onClick={handleLogout}>
					Logout
				</Button>
				<Typography variant="h5">Pantry</Typography>
				<IngredientSummary />
			</Stack>
		</>
	);
}

export default EditProfilePage;

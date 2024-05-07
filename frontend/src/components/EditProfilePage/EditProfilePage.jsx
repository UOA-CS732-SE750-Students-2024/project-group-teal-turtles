import React from "react";
import IngredientSummary from "../IngredientSummary/IngredientSummary";
import ProfileSummary from "../ProfileSummary/ProfileSummary";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

function EditProfilePage() {
	return (
		<>
			<Stack direction="column" spacing={4} alignItems="center" sx={{ width: "40%", margin: "0 auto", padding: "10vh" }}>
				<ProfileSummary />
				<Typography variant="h5">
					Pantry
				</Typography>
				<IngredientSummary />
			</Stack>
		</>
	);
}

export default EditProfilePage;

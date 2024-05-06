"use client";

import MealGenerationPanel from "@/components/MealGenerationPanel/MealGenerationPanel";
import UserPantryGrid from "@/components/PantryDash/UserPantryGrid";
import { Stack } from "@mui/material";
import React from "react";
import { Button, Container } from "@mui/material";
import { logout } from "@/app/auth-functions";
import useDataStore from "@/lib/store";
import { useRouter } from "next/navigation";

function Dashboard() {
	const {
		setUserGeneratedMeals,
		setUserDislikedIngredients,
		setUserEmail,
		setUserFavouriteMeals,
		setUserIngredients,
		setUserParameters,
		setAuthorisedUser
	} = useDataStore();

	return (
		<Stack
			sx={{ backgroundColor: "#FFFFFF", minHeight: "calc(100vh - 70px)" }}
			alignItems="center"
			justifyContent="center"
		>
			<Container>
				<MealGenerationPanel />
				<UserPantryGrid />
			</Container>
		</Stack>
	);
}

export default Dashboard;

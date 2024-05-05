"use client";

import IngredientSelector from "@/components/IngredientSelector/IngredientSelector";
import MealGenerationPanel from "@/components/MealGenerationPanel/MealGenerationPanel";
import React from "react";
import { Button } from "@mui/material";
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
		setAuthToken
	} = useDataStore();
	const router = useRouter();
	const handleLogout = async () => {
		try {
			await logout();
			setUserGeneratedMeals([]);
			setUserDislikedIngredients([]);
			setUserEmail(null);
			setUserFavouriteMeals([]);
			setUserIngredients([]);
			setUserParameters(null);
			setAuthToken(null);
			router.push("/landing");
			console.log("logout successful");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button onClick={handleLogout}>Logout</Button>
			<MealGenerationPanel />
			<IngredientSelector />
		</>
	);
}

export default Dashboard;

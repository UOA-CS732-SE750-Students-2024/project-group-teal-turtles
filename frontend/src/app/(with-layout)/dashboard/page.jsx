"use client";

import MealGenerationPanel from "@/components/MealGenerationPanel/MealGenerationPanel";
import UserPantryGrid from "@/components/PantryDash/UserPantryGrid";
import { Stack } from "@mui/material";
import React from "react";

function Dashboard() {
	return (
		<Stack
			sx={{ backgroundColor: "#FFFFFF", minHeight: "calc(100vh - 70px)" }}
			alignItems="center"
			justifyContent="center"
		>
			<MealGenerationPanel />
			<UserPantryGrid />
		</Stack>
	);
}

export default Dashboard;

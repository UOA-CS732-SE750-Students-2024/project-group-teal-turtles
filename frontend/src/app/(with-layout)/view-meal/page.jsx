"use client";

import React from "react";
import ViewMealCard from "@/components/ViewMeal/ViewMealCard";
import { Stack } from "@mui/material";

export default function ViewMeal() {
	console.log("ViewMeal");
	return (
		<Stack sx={{ backgroundColor: "#FFFFFF", minHeight: "calc(100vh - 70px)" }} alignItems="center">
			<ViewMealCard></ViewMealCard>
		</Stack>
	);
}

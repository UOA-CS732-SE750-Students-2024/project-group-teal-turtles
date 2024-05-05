"use client";

import IngredientSelector from "@/components/IngredientSelector/IngredientSelector";
import MealGenerationPanel from "@/components/MealGenerationPanel/MealGenerationPanel";
import React from "react";

function Dashboard() {
	return (
		<>
			<MealGenerationPanel />
			<IngredientSelector />
		</>
	);
}

export default Dashboard;

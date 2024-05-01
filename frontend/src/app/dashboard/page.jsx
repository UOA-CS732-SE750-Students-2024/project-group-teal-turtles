"use client"

import IngredientSelector from "@/components/IngredientSelector/IngredientSelector";
import Layout from "@/components/Layout/Layout";
import MealGenerationPanel from "@/components/MealGenerationPanel/MealGenerationPanel";
import React from "react";

function Dashboard() {
	return (
		<Layout>
			<MealGenerationPanel/>
			<IngredientSelector/>
		</Layout>
	);
}

export default Dashboard;

"use client"

import IngredientSelector from "@/components/IngredientSelector/IngredientSelector";
import Layout from "@/components/Layout/Layout";
import MealGenerationPanel from "@/components/MealGenerationPanel/MealGenerationPanel";
import React from "react";

function Dashboard() {
	return (
		<Layout>
			<div>Dashboard</div>
			<MealGenerationPanel/>
			<IngredientSelector/>
		</Layout>
	);
}

export default Dashboard;

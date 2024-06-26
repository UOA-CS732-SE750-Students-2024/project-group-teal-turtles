"use client";
import DashboardGenerationPanel from "@/components/dashboard/DashboardGenerationPanel/DashboardGenerationPanel";
import { Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import PantryGrid from "@/components/PantryGrid";
import ingredients from "@/lib/ingredients.json";
import useDataStore from "@/lib/store";
import StyledButton from "@/components/StyledButton";

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "calc(100vh - 70px)",
		py: 5
	}
};

/**
 * Represents the dashboard page displaying meal generation options and user's pantry.
 * @returns {JSX.Element} The JSX representation of the DashboardPage component.
 */
function DashboardPage() {
	const router = useRouter();
	const { userIngredients } = useDataStore();
	let ingredientsPantry = ingredients.filter((item) => userIngredients.includes(item.title));

	return (
		<Stack alignItems="center" justifyContent="center" sx={{ backgroundColor: "background.paper" }}>
			<Container sx={styles.container}>
				<Typography variant="h2" align="center" fontWeight="bold" gutterBottom sx={{ color: "primary.main" }}>
					Generate a Meal
				</Typography>
				<DashboardGenerationPanel />
			</Container>
			<Divider orientation="horizontal" variant="middle" width="600px" />
			<Container sx={styles.container}>
				<Typography variant="h2" align="center" fontWeight="bold" gutterBottom sx={{ color: "primary.main" }}>
					Your Pantry
				</Typography>

				{userIngredients && userIngredients.length > 0 ? (
					<Card sx={{ p: 2, borderRadius: 4, maxWidth: "1012px" }} elevation={5}>
						<PantryGrid
							itemData={ingredientsPantry}
							onClick={() => router.push("/pantry")}
							selected={userIngredients}
						/>
					</Card>
				) : (
					<StyledButton text="+  Add Ingredients" onClick={() => router.push("/pantry")} sx={{ mt: 3 }} />
				)}
			</Container>
		</Stack>
	);
}

export default DashboardPage;

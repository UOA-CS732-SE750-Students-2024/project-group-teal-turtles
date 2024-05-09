"use client";
import DashboardGenerationPanel from "@/components/DashboardGenerationPanel/DashboardGenerationPanel";
import { Box, Card, Divider, Fab, Stack, Typography } from "@mui/material";
import React from "react";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import PantryGrid from "@/components/pantry/PantryGrid";
import ingredients from "@/ingredients.json";
import useDataStore from "@/lib/store";
import StyledButton from "@/components/StyledButton/StyledButton";

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

function Dashboard() {
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

export default Dashboard;

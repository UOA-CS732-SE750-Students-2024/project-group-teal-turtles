"use client";
import DashboardGenerationPanel from "@/components/DashboardGenerationPanel/DashboardGenerationPanel";
import { Box, Divider, Fab, Stack, Typography } from "@mui/material";
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
				<Typography variant="h2" align="center" fontWeight="bold" gutterBottom sx={{ color: "primary.dark" }}>
					Generate a Meal
				</Typography>
				<DashboardGenerationPanel />
			</Container>
			<Divider orientation="horizontal" variant="middle" width="600px" />
			<Container sx={styles.container}>
				<Typography variant="h2" align="center" fontWeight="bold" gutterBottom sx={{ color: "primary.dark" }}>
					Your Pantry
				</Typography>

				{userIngredients && userIngredients.length > 0 ? (
					<Box sx={{ backgroundColor: "grey.300", p: 2, borderRadius: 1, maxWidth: "1012px" }}>
						<PantryGrid
							itemData={ingredientsPantry}
							onClick={() => router.push("/pantry")}
							selected={userIngredients}
						/>
					</Box>
				) : (
					<StyledButton text="+ Add Ingredients" onClick={() => router.push("/pantry")} />
				)}
			</Container>
		</Stack>
	);
}

export default Dashboard;

"use client";
import MealGenerationPanel from "@/components/MealGenerationPanel/MealGenerationPanel";
import { Box, Divider, Fab, Stack, Typography } from "@mui/material";
import React from "react";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import PantryGrid from "@/components/Pantry/PantryGrid";
import ingredients from "../../../ingredients.json";
import useDataStore from "@/lib/store";

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
		<Stack alignItems="center" justifyContent="center">
			<Container sx={styles.container}>
				<Typography variant="h2" align="center" gutterBottom>
					Generate a Meal
				</Typography>
				<MealGenerationPanel />
			</Container>
			<Divider orientation="horizontal" variant="middle" width="600px" />
			<Container sx={styles.container}>
				<Typography variant="h2" align="center" gutterBottom>
					Your Pantry
				</Typography>

				{userIngredients && userIngredients.length > 0 ? (
					<Box sx={{ backgroundColor: "grey.300", p: 2, borderRadius: 1 }}>
						<PantryGrid
							itemData={ingredientsPantry}
							onClick={() => router.push("/pantry")}
							selected={userIngredients}
						/>
					</Box>
				) : (
					<Button onClick={() => router.push("/pantry")} variant="contained" sx={{ p: 2 }}>
						<AddIcon sx={{ mr: 1 }} />
						Add Ingredients
					</Button>
				)}
			</Container>
		</Stack>
	);
}

export default Dashboard;

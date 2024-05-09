"use client";
import DashboardGenerationPanel from "@/components/dashboard/DashboardGenerationPanel/DashboardGenerationPanel";
import { Box, Divider, Fab, Stack, Typography } from "@mui/material";
import React from "react";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import PantryGrid from "@/components/PantryGrid";
import ingredients from "@/ingredients.json";
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

export default DashboardPage;

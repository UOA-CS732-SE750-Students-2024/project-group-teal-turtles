"use client";

import MealGenerationPanel from "@/components/MealGenerationPanel/MealGenerationPanel";
import UserPantryGrid from "@/components/PantryDash/UserPantryGrid";
import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { Button, Container } from "@mui/material";

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		minHeight: "calc(100vh - 70px)"
	}
};

function Dashboard() {
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
				<UserPantryGrid />
			</Container>
		</Stack>
	);
}

export default Dashboard;

"use client";

import React from "react";
import PantryTabs from "@/components/Pantry/PantryTabs";
import { Box, Stack } from "@mui/material";

function EditIngredients() {
	return (
		<Stack
			sx={{ backgroundColor: "#FFFFFF", minHeight: "calc(100vh - 70px)" }}
			alignItems="center"
			justifyContent="center"
		>
			<Box
				sx={{
					backgroundColor: "#FFF0FF",
					height: "100%",
					width: "100%",
					minHeight: "calc(100vh - 70px)",
					maxWidth: 1000
				}}
			>
				<PantryTabs />
			</Box>
		</Stack>
	);
}

export default EditIngredients;

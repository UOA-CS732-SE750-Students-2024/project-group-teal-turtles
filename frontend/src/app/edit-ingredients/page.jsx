import Layout from "@/components/Layout/Layout";
import React from "react";
import PantryTabs from "@/components/PantryTabs/PantryTabs";
import { Box, Stack } from "@mui/material";

function EditIngredients() {
	return (
		<Layout>
			<Stack
				height="calc(100vh - 120px)"
				sx={{ backgroundColor: "#FFFFFF" }}
				alignItems="center"
				justifyContent="center"
			>
				<Box sx={{ backgroundColor: "#FFF0FF", height: "100%", width: "100%", maxWidth: 1000 }}>
					<PantryTabs />
				</Box>
			</Stack>
		</Layout>
	);
}

export default EditIngredients;

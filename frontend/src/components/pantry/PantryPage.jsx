"use client";

import React from "react";
import PantryTabs from "@/components/pantry/PantryTabs";
import { Box, Stack } from "@mui/material";

function Pantry() {
	return (
		<Stack width="100%" sx={{ backgroundColor: "background.paper" }}>
			<Stack sx={{ minHeight: "calc(100vh - 70px)" }} alignItems="center" justifyContent="center">
				<Box
					sx={{
						height: "100%",
						width: "100%",
						minHeight: "calc(100vh - 70px)",
						maxWidth: 1000
					}}
				>
					<PantryTabs />
				</Box>
			</Stack>
		</Stack>
	);
}

export default Pantry;

"use client";

import React from "react";
import PantryTabs from "@/components/Pantry/PantryTabs";
import { Box, Stack } from "@mui/material";
import QuickSearch from "@/components/EditProfilePage/QuickSearch/QuickSearch";

function Pantry() {
	return (
		<>
			<QuickSearch />
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
		</>
	);
}

export default Pantry;

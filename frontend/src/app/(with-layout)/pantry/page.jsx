"use client";

import React from "react";
import PantryTabs from "@/components/Pantry/PantryTabs";
import { Box, Stack } from "@mui/material";
import QuickSearchModal from "@/components/EditProfilePage/QuickSearch/QuickSearchModal";

function Pantry() {
	const [ingredients, setIngredients] = React.useState([]);
	const [modalOpen, setModalOpen] = React.useState(true);
	return (
		<>
			<QuickSearchModal
				ingredients={ingredients}
				setIngredients={setIngredients}
				isOpen={modalOpen}
				handleClose={()=>{setModalOpen(false)}}
			/>
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

import { Modal, Paper } from "@mui/material";
import QuickSearch from "./QuickSearch";
import React from "react";

function QuickSearchModal({ selectedIngredients, setSelectedIngredients, isOpen, handleClose }) {
	return (
		<Modal open={isOpen} onClose={handleClose}>
			<Paper
				elevation={12}
				sx={{
					height: "90%",
					width: "auto",
					overflow: "auto",
					mt: "2vh",
					ml: "2vw",
					mr: "2vw",
					pt: "2vh",
					pb: "2vh",
					pl: "2vw",
					pr: "2vw",
					"&::-webkit-scrollbar": {
						display: "none"
					}
				}}
			>
				<QuickSearch
					selectedIngredients={selectedIngredients}
					setSelectedIngredients={setSelectedIngredients}
					handleClose={handleClose}
				/>
			</Paper>
		</Modal>
	);
}

export default QuickSearchModal;

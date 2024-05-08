import { Modal, Paper, Button } from "@mui/material";
import QuickSearch from "./QuickSearch";
import React from "react";

function QuickSearchModal({ selectedIngredients, setSelectedIngredients, isOpen, handleClose }) {
	return (
		<Modal open={isOpen}>
			<>
				<Paper elevation={12} sx={{ height: "75%", width: "50%", overflow: "auto" }}>
					<QuickSearch selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} />
				</Paper>
				<Button variant="contained" onClick={handleClose}>
					Close
				</Button>
			</>
		</Modal>
	);
}

export default QuickSearchModal;

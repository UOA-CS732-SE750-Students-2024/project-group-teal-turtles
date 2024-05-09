import { Modal, Paper, Button } from "@mui/material";
import QuickSearch from "./QuickSearch";
import React from "react";

function QuickSearchModal({ selectedIngredients, setSelectedIngredients, isOpen, handleClose }) {
	return (
		<Modal open={isOpen}>
			<>
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
						pr: "2vw"
					}}
				>
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

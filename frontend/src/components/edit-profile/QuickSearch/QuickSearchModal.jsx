import { Modal, Paper } from "@mui/material";
import QuickSearch from "./QuickSearch";
import React from "react";

/**
 * QuickSearchModal component displays a modal dialog with a QuickSearch component inside.
 * @param {object} props - The component props.
 * @param {Array} props.selectedIngredients - The currently selected ingredients.
 * @param {function} props.setSelectedIngredients - Function to update selected ingredients.
 * @param {boolean} props.isOpen - Flag indicating whether the modal is open or not.
 * @param {function} props.handleClose - Function to handle modal close event.
 * @returns {JSX.Element} A React JSX element representing the QuickSearchModal.
 */
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

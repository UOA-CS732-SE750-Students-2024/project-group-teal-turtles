import { Modal, Paper, Button, IconButton } from "@mui/material";
import QuickSearch from "./QuickSearch";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

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
					<QuickSearch
						selectedIngredients={selectedIngredients}
						setSelectedIngredients={setSelectedIngredients}
						handleClose={handleClose}
					/>
				</Paper>
				{/* <Button sx={{ ml: "2vw" }} variant="contained" onClick={handleClose}>
					Close
				</Button> */}
				{/* <IconButton onClick={handleClose}>
					<CloseIcon />
				</IconButton> */}
			</>
		</Modal>
	);
}

export default QuickSearchModal;

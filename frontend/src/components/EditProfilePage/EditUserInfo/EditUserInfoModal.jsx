import React from "react";
import { Paper, Button, Modal } from "@mui/material";
import EditUserInfoForm from "./EditUserInfoForm";

function EditUserInfoModal({ isOpen, handleClose }) {
	return (
		<Modal open={isOpen}>
			<>
				<Paper style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<EditUserInfoForm onSave={()=>{console.log("NOTHING")}} onClose={handleClose} />
				</Paper>
			</>
		</Modal>
	);
}

export default EditUserInfoModal;

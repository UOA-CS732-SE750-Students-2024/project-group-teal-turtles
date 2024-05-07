import React, { useState } from "react";
import { TextField, Button, Modal, Paper, Stack } from "@mui/material";

function EditProfileSummary({ isOpen, setIsOpen }) {
	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<Modal open={isOpen} onClose={handleClose}>
			<Paper style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<form>
					<Stack>
						<TextField label="First Name" variant="outlined" />
						<TextField label="Last Name" variant="outlined" />
						<TextField label="Email" variant="outlined" />
						<TextField label="Description" variant="outlined" />
						<Button variant="contained" color="primary" type="submit" onClick={handleClose}>
							Save
						</Button>
					</Stack>
				</form>
			</Paper>
		</Modal>
	);
}

export default EditProfileSummary;

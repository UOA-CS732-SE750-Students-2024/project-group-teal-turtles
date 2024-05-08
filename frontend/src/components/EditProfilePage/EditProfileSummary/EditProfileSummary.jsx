import React, { useState } from "react";
import { TextField, Button, Modal, Paper, Stack } from "@mui/material";

function EditProfileSummary({ isOpen, handleClose }) {
	return (
		<Modal open={isOpen}>
			<Paper style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<form>
					<Stack>
						<TextField label="Username" variant="outlined" />
						<TextField label="Password" variant="outlined" />
						<TextField label="Email" variant="outlined" />
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

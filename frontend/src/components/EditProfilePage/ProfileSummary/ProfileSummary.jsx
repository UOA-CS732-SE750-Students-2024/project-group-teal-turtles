import React from "react";
import { Typography, Avatar, Stack } from "@mui/material";

function ProfileSummary() {
	return (
		<Stack direction="column" spacing={2} alignItems="center">
			<Avatar alt="User Avatar" src="/avatar.jpg" sx={{ height: "10vw", width: "10vw" }} />
			<Typography component="h1" variant="h5">
				John Doe
			</Typography>
			<Typography variant="body1">Email: johndoe@example.com</Typography>
			<Typography variant="body1">non-existent generic average everyday man</Typography>
			{/* Add more profile information here */}
		</Stack>
	);
}

export default ProfileSummary;

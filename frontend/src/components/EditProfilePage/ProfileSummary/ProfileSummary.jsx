import React from "react";
import { Typography, Avatar, Stack } from "@mui/material";
import Image from "next/image";

function ProfileSummary() {
	return (
		<Stack direction="column" spacing={2} alignItems="center">
			<Image src={"/user.png"} alt={"User"} width={150} height={150} style={{ filter: "invert(100%)" }} />
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

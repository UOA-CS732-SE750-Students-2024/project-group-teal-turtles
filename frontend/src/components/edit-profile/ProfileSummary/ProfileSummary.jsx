import React from "react";
import { Typography, Avatar, Stack } from "@mui/material";
import Image from "next/image";

function ProfileSummary(props) {
	return (
		<Stack direction="column" alignItems="center" justifyContent="flex-start">
			<Image src={"/logo.png"} alt={"User"} width={200} height={200} style={{ filter: "invert(100%)" }} />
			<Typography fontWeight="bold" variant="h3">
				{props.username}
			</Typography>
			<Typography variant="h6">{props.email}</Typography>
		</Stack>
	);
}

export default ProfileSummary;

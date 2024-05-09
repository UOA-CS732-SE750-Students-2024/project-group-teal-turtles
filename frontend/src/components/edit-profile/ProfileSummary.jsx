import React from "react";
import { Typography, Stack } from "@mui/material";
import Image from "next/image";

/**
 * ProfileSummary component displays a summary of user profile information.
 * @param {object} props - The component props.
 * @param {string} props.username - The username to display.
 * @param {string} props.email - The email address to display.
 * @returns {JSX.Element} A React JSX element representing the summary of user profile.
 */

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

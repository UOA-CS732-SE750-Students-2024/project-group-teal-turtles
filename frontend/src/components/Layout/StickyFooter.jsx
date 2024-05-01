import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary">
			{"© "}
			{new Date().getFullYear()}{" "}
			<Link color="inherit" href="/landing" sx={{ textDecoration: "none" }}>
				Intelligent Eats
			</Link>
			{". All rights reserved."}
		</Typography>
	);
}

export default function StickyFooter() {
	return (
		<Box
			component="footer"
			sx={{
				py: 4,
				px: 2,
				mt: "auto",
				backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800])
			}}
		>
			<Container maxWidth="lg">
				<Copyright />
			</Container>
		</Box>
	);
}

import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { grey } from "@mui/material/colors";

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
		<Card
			component="footer"
			sx={{
				mt: "auto",
				zIndex: 100
			}}
		>
			<Box sx={{ backgroundColor: grey[300], height: "1px" }} />
			<Container
				maxWidth="lg"
				sx={{
					py: 4,
					px: 2
				}}
			>
				<Copyright />
			</Container>
		</Card>
	);
}

"use client";

import { Typography, Stack, TextField, Card, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import "./../globals.css";
import Layout from "@/components/Layout/Layout";

function CircularCard({ title, body }) {
	return (
		title &&
		body && (
			<Card
				sx={{
					width: "240px",
					height: "240px",
					m: "auto",
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-evenly",
					p: 4,
					borderRadius: "50%",
					backgroundColor: "#6E528B"
				}}
			>
				<Typography color="#FFFFFF" variant="h2" lineHeight={1}>
					{title}
				</Typography>
				<Typography color="#FFFFFF" align="center" variant="h4">
					{body}
				</Typography>
			</Card>
		)
	);
}

function Landing() {
	// TODO: fetch these params
	let recipeCount, generationTime, reviewCount;

	return (
		<Layout>
			<Stack height="calc(100vh - 70px)">
				<Stack backgroundColor="#FFF7FF" spacing={6} flexGrow={1} alignItems="center" justifyContent="center">
					<Typography variant="h1" fontWeight={500}>
						Want a quick meal?
					</Typography>
					<Typography variant="h3" lineHeight="0">
						Generate a personalised recipe in seconds.
					</Typography>
					<TextField
						variant="outlined"
						placeholder="Search for a meal..."
						sx={{
							"& .MuiOutlinedInput-root": {
								mt: 4,
								borderRadius: 4,
								outline: "none",
								backgroundColor: "#FFFFFF",
								"& input": {
									fontSize: "40px",
									ml: 2
								}
							}
						}}
						InputProps={{
							endAdornment: (
								<IconButton>
									<ArrowForwardIcon sx={{ fontSize: "40px", color: "black" }} />
								</IconButton>
							)
						}}
					/>
				</Stack>
				<Stack direction="row" py={5} px={30} sx={{ backgroundColor: "#D0C1DA" }}>
					<CircularCard title={recipeCount ?? "Many"} body="Recipes Generated" />
					<CircularCard title={generationTime ?? "Fast"} body="Generation Time" />
					<CircularCard title={reviewCount ?? "Many"} body="Trusted Reviews" />
				</Stack>
			</Stack>
		</Layout>
	);
}

export default Landing;

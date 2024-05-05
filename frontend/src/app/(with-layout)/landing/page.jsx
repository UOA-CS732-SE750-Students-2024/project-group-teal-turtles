"use client";

import { Typography, Stack, TextField, Card, IconButton, CardActionArea } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import "./../../globals.css";
import { Search } from "@mui/icons-material";

function CircularCard({ title, body }) {
	return (
		title &&
		body && (
			<Card
				sx={{
					width: "400px",
					height: "200px",
					borderRadius: "20px 20px 0 0",
					m: "auto"
				}}
			>
				<CardActionArea
					sx={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						backgroundColor: "background.paper",
						height: "100%"
					}}
				>
					<Typography color="secondary.dark" variant="h2" fontWeight="600">
						{title}
					</Typography>
					<Typography color="secondary.main" align="center" variant="h4">
						{body}
					</Typography>
				</CardActionArea>
			</Card>
		)
	);
}

function Landing() {
	return (
		<Stack height="100vh">
			<Stack
				flexGrow={1}
				alignItems="center"
				justifyContent="center"
				sx={{
					backgroundImage: "url(/background.png)",
					backgroundSize: "cover"
				}}
			>
				<Typography variant="h1" fontWeight="900" sx={{ color: "background.paper", pb: 4 }}>
					Want a quick meal?
				</Typography>
				<Typography
					variant="h3"
					fontWeight="700"
					sx={{ color: "secondary.dark", backgroundColor: "primary.light", px: 4, py: 2 }}
				>
					Generate a personalised recipe in seconds.
				</Typography>
				<TextField
					variant="outlined"
					autoComplete="off"
					placeholder="Create me a recipe..."
					sx={{
						"& .MuiOutlinedInput-root": {
							mt: 4,
							borderRadius: 1,
							backgroundColor: "#FFFFFF",
							"& input": {
								fontSize: "30px",
								fontWeight: "700",
								ml: 2
							}
						},
						width: "40%"
					}}
					InputProps={{
						startAdornment: <Search sx={{ fontSize: "40px", color: "black" }} />,
						endAdornment: (
							<IconButton>
								<ArrowForwardIcon sx={{ fontSize: "40px", color: "black" }} />
							</IconButton>
						)
					}}
				/>
			</Stack>
			<Stack direction="row" pt={5} px={30} sx={{ backgroundColor: "background.default" }}>
				<CircularCard title="Many" body="Recipes Generated" />
				<CircularCard title="Fast" body="Generation Time" />
				<CircularCard title="Many" body="Trusted Reviews" />
			</Stack>
		</Stack>
	);
}

export default Landing;

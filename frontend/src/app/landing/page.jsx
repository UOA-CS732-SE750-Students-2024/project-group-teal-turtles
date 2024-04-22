import { Typography, Stack, TextField, Card, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import "./../globals.css";

function CircularCard({ title, body }) {
	return (
		title &&
		body && (
			<Card
				sx={{
					width: "350px",
					height: "350px",
					m: "auto",
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-evenly",
					p: 8,
					borderRadius: "50%"
				}}
			>
				<Typography variant="h1" lineHeight={1}>
					{title}
				</Typography>
				<Typography align="center" variant="h3">
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
		<Stack height="100vh" justifyContent="space-between">
			<Stack
				spacing={8}
				pt={30}
				flexGrow={1}
				sx={{ alignItems: "center", backgroundColor: "rgba(128, 128, 128, 0.5)" }}
			>
				<Card sx={{ px: 4, py: 2, borderRadius: 12 }}>
					<Typography fontSize="140px">Wanting a quick meal?</Typography>
				</Card>
				<Card sx={{ px: 4, py: 2, borderRadius: 6 }}>
					<Typography variant="h1">Generate a personalised recipe in seconds.</Typography>
				</Card>
				<TextField
					variant="outlined"
					placeholder="Search for a meal..."
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: 6,
							outline: "none",
							backgroundColor: "#FFFFFF",
							"& input": {
								fontSize: "65px",
								ml: 5
							}
						}
					}}
					InputProps={{
						endAdornment: (
							<IconButton mr={5}>
								<ArrowForwardIcon sx={{ fontSize: "65px" }} />
							</IconButton>
						)
					}}
				/>
			</Stack>
			<Stack direction="row" py={10} px={50}>
				<CircularCard title={recipeCount ?? "Many"} body="Recipes Generated" />
				<CircularCard title={generationTime ?? "Fast"} body="Generation Time" />
				<CircularCard title={reviewCount ?? "Many"} body="Trusted Reviews" />
			</Stack>
		</Stack>
	);
}

export default Landing;

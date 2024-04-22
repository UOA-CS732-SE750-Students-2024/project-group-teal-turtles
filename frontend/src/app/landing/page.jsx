import { Typography, Stack, TextField, Card, InputAdornment } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";

function CircularCard({ title, body }) {
	return (
		title &&
		body && (
			<Card
				sx={{
					width: "250px",
					height: "250px",
					m: "auto",
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-evenly",
					py: 5,
					borderRadius: "50%"
				}}
			>
				<Typography variant="h2">{title}</Typography>
				<Typography align="center" variant="h4">
					{body}
				</Typography>
			</Card>
		)
	);
}

function Landing() {
	let recipeCount, generationTime, reviewCount;

	return (
		<Stack height="100vh">
			<Stack spacing={4} sx={{ alignItems: "center" }}>
				<Card sx={{ px: 4, py: 2, borderRadius: 8 }}>
					<Typography variant="h1">Wanting a quick meal?</Typography>
				</Card>
				<Card sx={{ px: 4, py: 2, borderRadius: 4 }}>
					<Typography variant="h2">Generate a personalised recipe in seconds.</Typography>
				</Card>
				<TextField
					variant="outlined"
					placeholder="Search for a meal..."
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: 4,
							outline: "none",
							"& input": {
								fontSize: "50px",
								ml: 3
							}
						}
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<ArrowForwardIcon sx={{ mr: 2, fontSize: "50px" }} />
							</InputAdornment>
						)
					}}
				/>
			</Stack>
			<Stack direction="row">
				<CircularCard title={recipeCount ?? "Many"} body="Recipes Generated" />
				<CircularCard title={generationTime ?? "Fast"} body="Generation Time" />
				<CircularCard title={reviewCount ?? "Many"} body="Trusted Reviews" />
			</Stack>
		</Stack>
	);
}

export default Landing;

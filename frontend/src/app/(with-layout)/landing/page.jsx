"use client";

import { Typography, Stack, TextField, Card, IconButton, CardActionArea, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import "./../../globals.css";
import { Search } from "@mui/icons-material";
import useDataStore from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
	const { authorisedUser } = useDataStore();
	const router = useRouter();

	// Send user to dashboard if they are authorised in local storage
	if (authorisedUser !== null) {
		router.push("/dashboard");
	}

	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const delayToShowContent = setTimeout(() => {
			setShowContent(true);
		}, 50);

		return () => clearTimeout(delayToShowContent);
	}, []);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			// TODO: Enter search prompt here
			console.log("Enter key pressed");
		}
	};

	return (
		<Stack height="calc(100vh)">
			{showContent && (
				<>
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
							sx={{ color: "secondary.dark", backgroundColor: "primary.light", px: 4, py: 2, borderRadius: "20px" }}
						>
							Generate a personalised recipe in seconds.
						</Typography>

						<TextField
							variant="outlined"
							autoComplete="off"
							placeholder="Create me a recipe..."
							onKeyDown={handleKeyPress}
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
						<Box
							sx={{
								backgroundColor: "primary.light",
								px: 4,
								py: 2,
								borderRadius: "20px",
								height: "100px",
								display: "flex"
							}}
						>
							<Typography variant="h3" fontWeight="700" sx={{ color: "secondary.dark" }}>
								Start your chef journey now
							</Typography>
							<Box
								sx={{
									bgcolor: "white",
									borderRadius: "20px",
									ml: "5vh",
									border: "3px solid black",
									alignItems: "center",
									justifyContent: "center",
									display: "flex"
								}}
							>
								<IconButton onClick={() => router.push("/create-account")}>
									<ArrowForwardIcon sx={{ fontSize: "40px", color: "black" }} />
								</IconButton>
							</Box>
						</Box>
					</Stack>
					<Stack direction="row" pt={5} px={30} sx={{ backgroundColor: "background.default" }}>
						{/* TODO: Put something meaningful here */}
						<CircularCard title="Many" body="Recipes Generated" />
						<CircularCard title="Fast" body="Generation Time" />
						<CircularCard title="Many" body="Trusted Reviews" />
					</Stack>
				</>
			)}
		</Stack>
	);
}

export default Landing;

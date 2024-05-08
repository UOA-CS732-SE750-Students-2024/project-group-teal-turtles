"use client";

import { Typography, Stack, Card, CardActionArea } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import "./../../globals.css";
import useDataStore from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

function CircularCard({ title, body, back }) {
	const [flipped, setFlipped] = useState(false);

	return (
		<ReactCardFlip isFlipped={flipped}>
			<Card
				sx={{
					width: "400px",
					height: "200px",
					borderRadius: "20px 20px 0 0",
					m: "auto"
				}}
			>
				<CardActionArea
					key="front"
					onClick={() => setFlipped(!flipped)}
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
					<Typography color="primary.dark" align="center" variant="h4">
						{body}
					</Typography>
				</CardActionArea>
			</Card>
			<Card
				sx={{
					width: "400px",
					height: "200px",
					borderRadius: "20px 20px 0 0",
					m: "auto"
				}}
			>
				<CardActionArea
					onClick={() => setFlipped(!flipped)}
					key="back"
					sx={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						backgroundColor: "background.paper",
						height: "100%"
					}}
				>
					<Typography textAlign="center" variant="h6" sx={{ color: "secondary.dark", px: 5 }}>
						{back}
					</Typography>
				</CardActionArea>
			</Card>
		</ReactCardFlip>
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
						<Card sx={{ borderRadius: "20px", mt: "40px" }}>
							<CardActionArea
								onClick={() => router.push("/create-account")}
								sx={{
									pl: 4,
									pr: 2,
									py: 2,
									flexDirection: "row",
									display: "flex",
									alignItems: "center"
								}}
							>
								<Typography variant="h3" fontWeight="700" sx={{ color: "secondary.dark", mr: 2 }}>
									Start your chef journey now
								</Typography>
								<ArrowForwardIcon sx={{ fontSize: "40px", color: "black" }} />
							</CardActionArea>
						</Card>
					</Stack>
					<Stack
						direction="row"
						pt={5}
						px={30}
						justifyContent="space-evenly"
						sx={{ backgroundColor: "background.default" }}
					>
						<CircularCard
							title="Unlimited"
							body="Recipe Generation"
							back="Intelligent Eats allows for unlimited generated recipes for FREE. All you have to do is Sign up."
						/>
						<CircularCard
							title="Fast"
							body="Generation Times"
							back="No need to spend precious time searching for meals - We'll generate you a meal in 10 seconds or less."
						/>
						<CircularCard
							title="AI"
							body="Tailored Recipes"
							back="All Recipes and Meal images are generated using the latest, most powerful AI models."
						/>
					</Stack>
				</>
			)}
		</Stack>
	);
}

export default Landing;

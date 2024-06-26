"use client";

import { Typography, Stack, Card, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";
import "@/app/globals.css";
import useDataStore from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip";

/**
 * LandingCard component displays a card with front and back views.
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the card.
 * @param {string} props.body - The content of the card front.
 * @param {string} props.back - The content of the card back.
 * @returns {JSX.Element} React component.
 */
function LandingCard({ title, body, back }) {
	const [flipped, setFlipped] = useState(false);

	return (
		<Stack onMouseOver={() => setFlipped(true)} onMouseOut={() => setFlipped(false)}>
			<ReactCardFlip isFlipped={flipped}>
				<Card
					sx={{
						width: "400px",
						height: "200px",
						borderRadius: "20px 20px 0 0",
						m: "auto"
					}}
				>
					<Stack
						key="front"
						sx={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "background.paper",
							height: "100%"
						}}
					>
						<Typography variant="h2" fontWeight="bold" sx={{ color: " secondary.dark" }}>
							{title}
						</Typography>
						<Typography align="center" variant="h4" sx={{ color: "primary.dark" }}>
							{body}
						</Typography>
					</Stack>
				</Card>
				<Card
					sx={{
						width: "400px",
						height: "200px",
						borderRadius: "20px 20px 0 0",
						m: "auto"
					}}
				>
					<Stack
						key="back"
						sx={{
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "background.paper",
							height: "100%"
						}}
					>
						<Typography textAlign="center" variant="h6" fontWeight="bold" sx={{ color: "secondary.dark", px: 5 }}>
							{back}
						</Typography>
					</Stack>
				</Card>
			</ReactCardFlip>
		</Stack>
	);
}

/**
 * LandingPage component displays the landing page with cards and a call-to-action button.
 * @returns {JSX.Element} React component.
 */
function LandingPage() {
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

	return (
		showContent && (
			<Stack
				height="calc(100vh)"
				sx={{
					minWidth: "1350px"
				}}
			>
				<Stack
					flexGrow={1}
					alignItems="center"
					justifyContent="center"
					sx={{
						backgroundImage: "url(/background.png)",
						backgroundSize: "cover"
					}}
				>
					<Typography variant="h1" fontWeight="900" textAlign="center" sx={{ color: "background.paper" }}>
						Want a quick meal?
					</Typography>
					<Typography variant="h4" sx={{ color: "secondary.light", py: 4 }}>
						Generate a personalised recipe in seconds.
					</Typography>
					<Button
						variant="contained"
						onClick={() => router.push("/create-account")}
						sx={{
							color: "primary.dark",
							backgroundColor: "background.paper",
							"&:hover": { backgroundColor: "background.default" },
							mt: 4,
							px: 5,
							py: 2,
							borderRadius: "100px"
						}}
					>
						<Typography variant="h4" fontWeight="bold" sx={{ mr: 2 }} textTransform="none">
							Start your chef journey now
						</Typography>
						<ArrowForwardIcon sx={{ fontSize: "40px" }} />
					</Button>
				</Stack>
				<Stack
					direction="row"
					pt={5}
					spacing="60px"
					justifyContent="center"
					sx={{ backgroundColor: "background.default" }}
				>
					<LandingCard
						title="Unlimited"
						body="Recipe Generation"
						back="Intelligent Eats allows for unlimited generated recipes for FREE. All you have to do is Sign up."
					/>
					<LandingCard
						title="Fast"
						body="Generation Times"
						back="No need to spend precious time searching for meals - We'll generate you a meal in 10 seconds or less."
					/>
					<LandingCard
						title="AI"
						body="Tailored Recipes"
						back="All Recipes and Meal images are generated using the latest, most powerful AI models."
					/>
				</Stack>
			</Stack>
		)
	);
}

export default LandingPage;

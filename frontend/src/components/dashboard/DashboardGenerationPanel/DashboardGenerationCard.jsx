import { Card, CardActionArea, Typography } from "@mui/material";
import React from "react";

/**
 * Represents a card component for the dashboard generation section.
 * @param {Object} props - The props object.
 * @param {string} props.header - The header text for the card.
 * @param {string} props.description - The description text for the card.
 * @param {Function} props.onClick - The click event handler for the card.
 * @returns {JSX.Element} The JSX representation of the DashboardGenerationCard component.
 */
function DashboardGenerationCard({ header, description, onClick }) {
	return (
		<Card sx={{ borderRadius: 4 }} elevation={5}>
			<CardActionArea
				onClick={onClick}
				sx={{ px: "2vh", alignItems: "center", display: "flex", flexDirection: "column", height: "250px" }}
			>
				<Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "primary.main" }}>
					{header}
				</Typography>
				<Typography variant="h5" textAlign="center">
					{description}
				</Typography>
			</CardActionArea>
		</Card>
	);
}

export default DashboardGenerationCard;

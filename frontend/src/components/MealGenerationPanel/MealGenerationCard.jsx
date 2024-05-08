import { Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

function MealGenerationCard({ header, description, onClick }) {
	return (
		<Card sx={{ borderRadius: 4 }} elevation={5}>
			<CardActionArea
				onClick={onClick}
				sx={{ p: "3vh", alignItems: "center", display: "flex", flexDirection: "column" }}
			>
				<Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "primary.dark" }}>
					{header}
				</Typography>
				<Typography variant="h5" textAlign="center">
					{description}
				</Typography>
			</CardActionArea>
		</Card>
	);
}

export default MealGenerationCard;

import { Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

function DashboardGenerationCard({ header, description, onClick }) {
	return (
		<Card sx={{ borderRadius: 4 }} elevation={5}>
			<CardActionArea
				onClick={onClick}
				sx={{ px: "2vh", alignItems: "center", display: "flex", flexDirection: "column", height: "250px" }}
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

export default DashboardGenerationCard;

import { Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

function MealGenerationCard({ header, description, onClick }) {
	return (
		<Card sx={{ borderRadius: 2 }}>
			<CardActionArea onClick={onClick} sx={{ p: "2vh" }}>
				<Typography variant="h4">{header}</Typography>
				<CardContent>
					<Typography variant="h5">{description}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default MealGenerationCard;

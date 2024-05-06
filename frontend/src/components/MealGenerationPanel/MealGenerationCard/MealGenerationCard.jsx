import { Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import styles from "./MealGenerationCard.module.css";

function MealGenerationCard({ header, description, onClick }) {
	return (
		<Card sx={{ p: "2vh", borderRadius: 2 }}>
			<CardActionArea onClick={onClick}>
				<Typography variant="h4">{header}</Typography>
				<CardContent>
					<Typography variant="h5">{description}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default MealGenerationCard;

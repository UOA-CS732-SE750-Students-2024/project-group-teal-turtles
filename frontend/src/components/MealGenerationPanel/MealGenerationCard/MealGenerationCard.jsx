import { Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import styles from "./MealGenerationCard.module.css";

function MealGenerationCard({ header, description, onClick }) {
	return (
		<Card>
			<CardActionArea onClick={onClick}>
				<CardHeader title={header} />
				<CardContent>
					<Typography variant="body2">{description}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default MealGenerationCard;

import { Card, CardActionArea, Typography } from "@mui/material";

function CategoryCard({ src, text, onClick }) {
	return (
		<Card>
			<CardActionArea onClick={onClick(text)}>
				<img src={src}></img>
				<Typography>{text}</Typography>
			</CardActionArea>
		</Card>
	);
}

export default CategoryCard;

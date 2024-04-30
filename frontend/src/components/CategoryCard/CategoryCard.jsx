import { Card, CardActionArea, Typography } from "@mui/material";
import Image from "next/image";

function CategoryCard({ src, text, onClick }) {
	return (
		<Card sx={{ borderRadius: 4, bgcolor: "#1876D0" }}>
			<CardActionArea onClick={onClick(text)} sx={{ paddingX: 4, paddingY: 2 }}>
				<Image src={src} width={40} height={40} />
				<Typography variant="h5" color="white" sx={{ marginTop: 2 }}>
					{text}
				</Typography>
			</CardActionArea>
		</Card>
	);
}

export default CategoryCard;

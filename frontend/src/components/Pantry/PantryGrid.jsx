import * as React from "react";
import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function PantryGrid({ itemData }) {
	return (
		<Grid sx={{ flexGrow: 1 }} container spacing={2}>
			{itemData.map((item) => (
				<Grid item>
					<Card>
						<CardActionArea
							sx={{
								height: 150,
								width: 150,
								backgroundColor: "#fff",
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "column",
								gap: "5"
							}}
						>
							<Image src={`${item.img}`} alt={item.title} width={100} height={100} priority />
							<Typography color="#000" variant="body1" lineHeight={1}>
								{item.title}
							</Typography>
						</CardActionArea>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

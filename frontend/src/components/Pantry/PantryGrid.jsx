import * as React from "react";
import { Card, CardActionArea, Grid, Typography, alpha, useTheme } from "@mui/material";
import Image from "next/image";

export default function PantryGrid({ itemData, variant, onClick, selected }) {
	const theme = useTheme();

	return (
		<Grid
			sx={{ flexGrow: 1, justifyContent: variant === "onboarding" ? "space-evenly" : "auto" }}
			container
			spacing={2}
		>
			{itemData.map((item) => (
				<Grid item key={item.title}>
					<Card
						sx={{
							position: "relative",
							backgroundColor: selected
								? selected.includes(item.title)
									? theme.palette.primary.main
									: "#fff"
								: "#fff",
							color: selected ? (selected.includes(item.title) ? "#fff" : "#000") : "#000"
						}}
					>
						<CardActionArea
							onClick={() => onClick(item.title)}
							sx={{
								height: 150,
								width: 150,
								backgroundColor: alpha("#fff", 0),
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								flexDirection: "column",
								gap: "5"
							}}
						>
							<Image
								src={`${item.img}`}
								alt={item.title}
								width={100}
								height={100}
								priority
								style={{ filter: selected && selected.includes(item.title) ? "invert(100%)" : "none" }}
							/>
							<Typography variant="body1" lineHeight={1}>
								{item.title}
							</Typography>
						</CardActionArea>
						{/* <Checkbox
							checked={selected ? selected.includes(item.title) : false}
							disableRipple
							sx={{
								position: "absolute",
								top: 0,
								right: 0,
								color: "#000",
								"&.Mui-checked": {
									color: "auto"
								},
								"& .MuiSvgIcon-root": { fontSize: 28 }
							}}
						/> */}
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

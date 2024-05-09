import { Card, CardActionArea, Grid, Typography, alpha } from "@mui/material";
import Image from "next/image";

/**
 * PantryGrid component for displaying items in a grid layout.
 * @param {Object} props - The props for the PantryGrid component.
 * @param {Array<Object>} props.itemData - The data for the items to be displayed.
 * @param {string} props.variant - The variant of the grid layout.
 * @param {function} props.onClick - The function to handle click events on items.
 * @param {Array<string>} props.selected - The list of selected items.
 * @returns {JSX.Element} The PantryGrid component.
 */
export default function PantryGrid({ itemData, variant, onClick, selected }) {
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
									? "primary.main"
									: "background.paper"
								: "background.paper",
							color: selected
								? selected.includes(item.title)
									? "background.paper"
									: "secondary.dark"
								: "secondary.dark"
						}}
					>
						<CardActionArea
							onClick={() => onClick(item.title)}
							sx={{
								height: 150,
								width: 150,
								backgroundColor: alpha("#FFFFFF", 0),
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
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

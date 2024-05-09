import { Card, Stack } from "@mui/material";

function CardWrapper({ children }) {
	return (
		<Stack
			height="100vh"
			width="100vw"
			justifyContent="center"
			alignItems="center"
			display="flex"
			sx={{ backgroundColor: "background.default" }}
		>
			<Card sx={{ p: 6, borderRadius: 3 }}>{children}</Card>
		</Stack>
	);
}

export default CardWrapper;

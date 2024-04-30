import { Card, Stack } from "@mui/material";

function CardWrapper({ children }) {
	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 6, borderRadius: 3 }}>{children}</Card>
		</Stack>
	);
}

export default CardWrapper;

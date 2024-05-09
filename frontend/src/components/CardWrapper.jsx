import { Card, Stack } from "@mui/material";

/**
 * CardWrapper component for wrapping content in a centered card layout.
 * @param {Object} props - The props for the CardWrapper component.
 * @param {ReactNode} props.children - The child elements to be wrapped.
 * @returns {JSX.Element} The CardWrapper component.
 */
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

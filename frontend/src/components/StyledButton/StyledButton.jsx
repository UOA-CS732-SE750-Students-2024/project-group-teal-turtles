import { Button, Typography } from "@mui/material";

function StyledButton({ text, onClick, sx }) {
	return (
		<Button
			variant="contained"
			onClick={onClick != null ? onClick : () => {}}
			sx={{ ...sx, borderRadius: "30px", height: "60px", width: "200px" }}
		>
			<Typography textTransform="none" fontWeight="bold" variant="h6">
				{text}
			</Typography>
		</Button>
	);
}

export default StyledButton;

import { Button, Typography } from "@mui/material";

function StyledButton({ text, onClick }) {
	return (
		<Button variant="contained" onClick={onClick} sx={{ borderRadius: "30px", height: "60px", width: "200px" }}>
			<Typography textTransform="none" fontWeight="bold">
				{text}
			</Typography>
		</Button>
	);
}

export default StyledButton;

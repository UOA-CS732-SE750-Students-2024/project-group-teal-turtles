import { Button, Typography } from "@mui/material";

/**
 * StyledButton component for a custom-styled button.
 * @param {Object} props - The props for the StyledButton component.
 * @param {string} props.text - The text to display on the button.
 * @param {function} [props.onClick] - The function to handle click events on the button.
 * @param {Object} [props.sx] - The style object for customizing the button's appearance.
 * @param {boolean} [props.disabled] - Whether the button is disabled or not.
 * @returns {JSX.Element} The StyledButton component.
 */
function StyledButton({ text, onClick, sx, disabled }) {
	return (
		<Button
			variant="contained"
			onClick={onClick != null ? onClick : () => {}}
			disabled={disabled != null ? disabled : false}
			sx={{ ...sx, borderRadius: "30px", height: "60px", width: "200px" }}
		>
			<Typography textTransform="none" fontWeight="bold" variant="h6">
				{text}
			</Typography>
		</Button>
	);
}

export default StyledButton;

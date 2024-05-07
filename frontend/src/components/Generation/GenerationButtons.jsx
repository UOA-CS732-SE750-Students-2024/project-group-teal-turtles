import { Stack, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function GenerationButtons({ generateOptionParam }) {
	const router = useRouter();

	const options = ["Basic", "Strict", "Remix", "Prompt"];

	const handleButtonClick = (option) => {
		router.push(`/generation-options?generateOption=${option}`);
	};

	return (
		<Stack direction="row" justifyContent="space-between" spacing="20px">
			{options.map((option, index) => (
				<Button
					fullWidth
					variant={option === generateOptionParam ? "contained" : "outlined"}
					key={index}
					onClick={() => handleButtonClick(option)}
					sx={{ borderRadius: "20px", height: "80px" }}
				>
					<Typography variant="h5" fontWeight="bold" textTransform="none">
						{option}
					</Typography>
				</Button>
			))}
		</Stack>
	);
}

export default GenerationButtons;

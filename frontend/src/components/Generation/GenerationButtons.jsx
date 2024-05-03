import { Box, Button } from "@mui/material";
import styles from "./GenerationButtons.module.css";
import { useRouter } from "next/navigation";

function GenerationButtons({ generateOptionParam }) {
	const router = useRouter();

	const options = ["Basic", "Strict", "Remix", "Prompt"];

	const handleButtonClick = (option) => {
		router.push(`/generation-options?generateOption=${option}`);
	};

	return (
		<Box className={styles.buttonContainer}>
			{options.map((option, index) => (
				<Box
					key={index}
					onClick={() => handleButtonClick(option)}
					className={option === generateOptionParam ? `${styles.button} ${styles.selected}` : styles.button}
				>
					{option}
				</Box>
			))}
		</Box>
	);
}

export default GenerationButtons;

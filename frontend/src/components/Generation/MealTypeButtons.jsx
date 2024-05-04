import { Box } from "@mui/material";
import styles from "./MealTypeButtons.module.css";
import useDataStore from "@/lib/store";

function MealTypeButtons({}) {
	const mealTypes = ["Breakfast", "Lunch", "Dinner"];
	const { setUserParameters, userParameters } = useDataStore();
	console.log(userParameters);

	const handleBoxClick = (mealType) => {
		//handle click
	};

	return (
		<Box className={styles.buttonContainer}>
			{mealTypes.map((mealType, index) => (
				<Box
					key={index}
					onClick={() => handleBoxClick(mealType)}
					className={
						userParameters && mealType.toLocaleLowerCase() === userParameters.mealType.toLowerCase()
							? `${styles.button} ${styles.selected}`
							: styles.button
					}
				>
					{mealType}
				</Box>
			))}
		</Box>
	);
}

export default MealTypeButtons;

import { Box } from "@mui/material";
import styles from "./MealTypeButtons.module.css";

function MealTypeButtons({ selectedMealType, onSelectMealType }) {
	const mealTypes = ["Breakfast", "Lunch", "Dinner"];

	const handleBoxClick = (mealType) => {
		//handle click
	};

	return (
		<Box className={styles.buttonContainer}>
			{mealTypes.map((mealType, index) => (
				<Box
					key={index}
					onClick={() => handleBoxClick(mealType)}
					className={mealType === selectedMealType ? `${styles.button} ${styles.selected}` : styles.button}
				>
					{mealType}
				</Box>
			))}
		</Box>
	);
}

export default MealTypeButtons;

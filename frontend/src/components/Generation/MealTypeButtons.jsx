import { Box } from "@mui/material";
import styles from "./MealTypeButtons.module.css";
import useDataStore from "@/lib/store";

function MealTypeButtons() {
	const mealTypes = ["Breakfast", "Lunch", "Dinner"];
	const { setUserParameters, userParameters } = useDataStore();

	return (
		<Box className={styles.buttonContainer}>
			{mealTypes.map((mealType, index) => (
				<Box
					key={index}
					onClick={() => setUserParameters({ ...userParameters, mealType: mealType.toLowerCase() })}
					className={
						userParameters !== null && mealType.toLocaleLowerCase() === userParameters.mealType.toLowerCase()
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

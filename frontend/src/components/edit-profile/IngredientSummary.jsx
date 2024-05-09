import allIngredients from "@/lib/ingredients.json";
import { Grid, Card, CardMedia } from "@mui/material";

/**
 * IngredientSummary component displays a summary of ingredients.
 * @param {object} props - The component props.
 * @param {Array} props.ingredients - The array of ingredient titles to display.
 * @returns {JSX.Element} A React JSX element representing the summary of ingredients.
 */

function IngredientSummary({ ingredients }) {
	let ingredientInfo = allIngredients.filter((item) => ingredients.includes(item.title));

	return (
		<>
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				{ingredientInfo.map((ingredient) => (
					<Grid item key={ingredient.title}>
						<Card sx={{ width: 75, height: 75 }}>
							<CardMedia component="img" image={ingredient.img} alt={ingredient.title} />
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default IngredientSummary;

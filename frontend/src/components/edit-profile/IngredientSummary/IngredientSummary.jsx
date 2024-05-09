import allIngredients from "@/ingredients.json";
import { Grid, Card, CardMedia } from "@mui/material";

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

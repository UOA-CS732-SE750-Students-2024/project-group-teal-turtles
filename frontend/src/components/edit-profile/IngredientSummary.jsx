import allIngredients from "@/lib/ingredients.json";
import { Grid, Card, CardMedia } from "@mui/material";

function IngredientSummary({ ingredients }) {
	let ingredientInfo = allIngredients.filter((item) => ingredients.includes(item.title));

	return (
		<>
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				{ingredientInfo.map((ingredient) => (
					<Grid item key={ingredient.title}>
						<Card sx={{ width: 50, height: 50 }}>
							<CardMedia component="img" image={ingredient.img} alt={ingredient.title} />
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default IngredientSummary;

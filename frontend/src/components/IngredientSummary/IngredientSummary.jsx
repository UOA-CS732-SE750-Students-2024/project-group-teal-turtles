import useDataStore from "@/lib/store";
import React from "react";
import ingredients from "../../ingredients.json";
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";
import Link from "next/link";

function IngredientSummary() {
	const { userIngredients, setUserIngredients } = useDataStore();
	let ingredientsPantry = ingredients.filter((item) => userIngredients.includes(item.title));

	return (
		<>
			{/* <div>{JSON.stringify(ingredientsPantry)}</div> */}
			{/* <div>{JSON.stringify(userIngredients)}</div> */}
			<Grid container spacing={2} justifyContent="center" alignItems="center">
				{ingredientsPantry.map((ingredient) => (
					<Grid item key={ingredient.title}>
						<Card sx={{ width: 50, height: 50 }}>
							<CardMedia component="img" image={ingredient.img} alt={ingredient.title} />
						</Card>
					</Grid>
				))}
				<Grid item>
					<Card sx={{ width: 50, height: 50 }}>
						<Link href="/pantry">
							<CardActionArea>
								<CardMedia component="img" image="https://via.placeholder.com/150" alt="placeholder" />
							</CardActionArea>
						</Link>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

export default IngredientSummary;

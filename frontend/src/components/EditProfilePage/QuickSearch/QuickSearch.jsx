import React from "react";
import { TextField } from "@mui/material";
import SearchResults from "./SearchResults";
import SelectedIngredients from "./SelectedIngredients";
import allIngredients from "@/ingredients.json";

function QuickSearch({ ingredients, setIngredients }) {
	const [searchTerm, setSearchTerm] = React.useState("");

	const selectedIngredients = ingredients.map((ingredient) => ingredient.title);
	const setSelectedIngredients = (newSelectedIngredients) => {
		const newIngredients = allIngredients.filter((item) => newSelectedIngredients.includes(item.title));

		newIngredients.sort((a, b) => {
			const indexA = selectedIngredients.indexOf(a.title);
			const indexB = selectedIngredients.indexOf(b.title);
			return indexA - indexB;
		});

		setIngredients(newIngredients);
	};

	const handleSelectIngredient = (ingredient) => {
		return () => {
			const isSelected = selectedIngredients.includes(ingredient);
			if (isSelected) {
				setSelectedIngredients(selectedIngredients.filter((selected) => selected !== ingredient));
			} else {
				setSelectedIngredients([...selectedIngredients, ingredient]);
			}
			console.log(selectedIngredients);
		};
	};

	return (
		<>
			<TextField label="Search Term" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			<SelectedIngredients
				ingredients={ingredients}
				selectedIngredients={selectedIngredients}
				handleSelectIngredient={handleSelectIngredient}
			/>
			<SearchResults
				searchTerm={searchTerm}
				selectedIngredients={selectedIngredients}
				handleSelectIngredient={handleSelectIngredient}
			/>
		</>
	);
}

export default QuickSearch;

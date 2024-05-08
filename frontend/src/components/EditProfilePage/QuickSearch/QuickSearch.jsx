import React from "react";
import { TextField } from "@mui/material";
import SearchResults from "./SearchResults";
import SelectedIngredients from "./SelectedIngredients";

function QuickSearch({ selectedIngredients, setSelectedIngredients }) {
	const [searchTerm, setSearchTerm] = React.useState("");

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
			<TextField
				sx={{ width: "100%" }}
				label="Search Term"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<SelectedIngredients
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

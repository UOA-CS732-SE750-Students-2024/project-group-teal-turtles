import React from "react";
import { TextField } from "@mui/material";
import SearchResults from "./SearchResults";
import SelectedIngredients from "./SelectedIngredients";
import allIngredients from "@/ingredients.json";

function QuickSearch({ selectedIngredients, setSelectedIngredients }) {
	const [searchTerm, setSearchTerm] = React.useState("");
	const searchResults = searchTerm == "" ? allIngredients : searchIngredients(searchTerm);

	const handleSelectIngredient = (ingredient) => {
		return () => {
			const isSelected = selectedIngredients.includes(ingredient);
			if (isSelected) {
				setSelectedIngredients(selectedIngredients.filter((selected) => selected !== ingredient));
			} else {
				setSelectedIngredients([...selectedIngredients, ingredient]);
			}
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
			<SelectedIngredients selectedIngredients={selectedIngredients} handleSelectIngredient={handleSelectIngredient} />
			<SearchResults
				searchResults={searchResults}
				selectedIngredients={selectedIngredients}
				handleSelectIngredient={handleSelectIngredient}
			/>
		</>
	);
}

export default QuickSearch;

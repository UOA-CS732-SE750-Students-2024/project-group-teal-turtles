import React from "react";
import { searchIngredients } from "./SearchUtil";
import { TextField } from "@mui/material";
import SearchResults from "./SearchResults";
import SelectedIngredients from "./SelectedIngredients";

function QuickSearch() {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [selectedIngredients, setSelectedIngredients] = React.useState([]);

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
			<SelectedIngredients selectedIngredients={selectedIngredients} handleSelectIngredient={handleSelectIngredient} />
			<SearchResults
				searchTerm={searchTerm}
				selectedIngredients={selectedIngredients}
				handleSelectIngredient={handleSelectIngredient}
			/>
		</>
	);
}

export default QuickSearch;

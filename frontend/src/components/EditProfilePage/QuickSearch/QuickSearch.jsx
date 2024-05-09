import React from "react";
import { TextField } from "@mui/material";
import SearchResults from "./SearchResults";
import SelectedIngredients from "./SelectedIngredients";
import allIngredients from "@/ingredients.json";
import { searchIngredients } from "./SearchUtil";
import { addDislikedIngredient, removeDislikedIngredient } from "@/helpers/dbCalls";
import { getAuth } from "firebase/auth";

function QuickSearch({ selectedIngredients, setSelectedIngredients }) {
	const [searchTerm, setSearchTerm] = React.useState("");
	const searchResults = searchTerm == "" ? allIngredients : searchIngredients(searchTerm);

	const handleSelectIngredient = (ingredient) => {
		return async () => {
			const isSelected = selectedIngredients.includes(ingredient);
			const authToken = await getAuth().currentUser.getIdToken();
			if (isSelected) {
				setSelectedIngredients(selectedIngredients.filter((selected) => selected !== ingredient));
				removeDislikedIngredient(authToken, ingredient);
			} else {
				setSelectedIngredients([...selectedIngredients, ingredient]);
				addDislikedIngredient(authToken, ingredient);
			}
		};
	};

	return (
		<>
			<TextField
				sx={{ width: "100%", mb: "2vh" }}
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

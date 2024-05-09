import React from "react";
import { TextField, Button, Box } from "@mui/material";
import SearchResults from "./SearchResults";
import SelectedIngredients from "./SelectedIngredients";
import allIngredients from "@/lib/ingredients.json";
import { searchIngredients } from "@/lib/SearchUtil";
import { addDislikedIngredient, removeDislikedIngredient } from "@/lib/dbCalls";
import { getAuth } from "firebase/auth";

function QuickSearch({ selectedIngredients, setSelectedIngredients, handleClose }) {
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
			<Box sx={{ display: "flex", flexDirection: "row" }}>
				<TextField
					sx={{ width: "100%", mb: "2vh" }}
					label="Search Term"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button sx={{ ml: "2vw", mb: "2vh" }} variant="contained" onClick={handleClose}>
					Close
				</Button>
			</Box>

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

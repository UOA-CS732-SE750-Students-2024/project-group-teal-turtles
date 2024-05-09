import { TextField, IconButton, Stack } from "@mui/material";
import SearchResults from "./SearchResults";
import SelectedIngredients from "./SelectedIngredients";
import allIngredients from "@/lib/ingredients.json";
import { searchIngredients } from "@/lib/SearchUtil";
import { Close, Search } from "@mui/icons-material";
import { useState } from "react";

/**
 * A component for quick ingredient search and selection.
 * @param {object} props - Component props.
 * @param {string[]} props.selectedIngredients - An array of selected ingredient names.
 * @param {Function} props.setSelectedIngredients - A function to set selected ingredients.
 * @param {Function} props.handleClose - A function to handle closing the search.
 * @returns {JSX.Element} QuickSearch component JSX.
 */
function QuickSearch({ selectedIngredients, setSelectedIngredients, handleClose }) {
	const [searchTerm, setSearchTerm] = useState("");
	const searchResults = searchTerm == "" ? allIngredients : searchIngredients(searchTerm);

	/**
	 * Handles selecting or deselecting an ingredient.
	 * @param {string} ingredient - The name of the ingredient.
	 * @returns {Function} Event handler function for ingredient selection.
	 */
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
			<Stack direction="row" alignItems="center" mb={4}>
				<TextField
					sx={{ width: "100%" }}
					InputProps={{
						startAdornment: <Search />,
						sx: {
							borderRadius: "30px",
							fontSize: "24px",
							height: "60px",
							paddingX: "20px"
						}
					}}
					inputProps={{
						style: {
							paddingLeft: 10
						}
					}}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<IconButton onClick={handleClose} sx={{ ml: 2 }}>
					<Close sx={{ width: "40px", height: "40px", color: "secondary.dark" }} />
				</IconButton>
			</Stack>
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

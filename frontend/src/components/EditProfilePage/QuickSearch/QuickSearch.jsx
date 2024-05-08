import React from "react";
import { searchIngredients } from "./SearchUtil";
import { TextField } from "@mui/material";
import SearchResults from "./SearchResults";
import ingredients from "@/ingredients.json";

function QuickSearch() {
	const [searchTerm, setSearchTerm] = React.useState("");
	const searchResults = searchTerm == "" ? ingredients : searchIngredients(searchTerm);

	return (
		<>
			<TextField label="Search Term" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			{JSON.stringify(searchResults)}
			<SearchResults searchResults={searchResults} />
		</>
	);
}

export default QuickSearch;

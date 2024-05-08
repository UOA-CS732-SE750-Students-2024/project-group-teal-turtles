import React from "react";
import { searchIngredients } from "./SearchUtil";
import { TextField } from "@mui/material";
import SearchResults from "./SearchResults";

function QuickSearch() {
	const [searchTerm, setSearchTerm] = React.useState("");

	const searchResults = searchIngredients(searchTerm);
	console.log(searchResults);

	return (
		<>
			<TextField label="Search Term" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			{JSON.stringify(searchResults)}
			<SearchResults searchResults={searchResults} />
		</>
	);
}

export default QuickSearch;

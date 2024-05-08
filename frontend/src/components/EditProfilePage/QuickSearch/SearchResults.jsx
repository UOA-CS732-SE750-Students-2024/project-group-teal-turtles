import React from "react";
import { categorizeIngredients } from "./SearchUtil";

function SearchResults({ searchResults }) {
	const categorizedResults = categorizeIngredients(searchResults);
    console.log(categorizedResults);

	return (
		<>
			{JSON.stringify(categorizedResults)}
			<div>SearchResults</div>
		</>
	);
}

export default SearchResults;

// "use client";

// import React, { useState, useEffect } from "react";

// import { DataContext } from "./DataContext";

// export const DataProvider = ({ children }) => {
// 	// initialize new states here
// 	const [userFavouriteMeals, setUserFavouriteMeals] = useState(null);
// 	const [userGeneratedMeals, setUserGeneratedMeals] = useState(null);
// 	const [userIngredients, setUserIngredients] = useState(null);
// 	const [userDislikedIngredients, setUserDislikedIngredients] = useState(null);
// 	const [userParameters, setUserParameters] = useState(null);
// 	const [userEmail, setUserEmail] = useState(null);
// 	const [authToken, setAuthToken] = useState(null);
// 	const [dataOne, setDataOne] = useState("hi");
// 	// const [dataOne, setDataOne] = useState({ value: "old value - this should persist between pages" });

// 	// pass the states to the context here
// 	const contextValue = {
// 		userFavouriteMeals,
// 		setUserFavouriteMeals,
// 		userIngredients,
// 		userGeneratedMeals,
// 		setUserGeneratedMeals,
// 		userIngredients,
// 		setUserIngredients,
// 		userDislikedIngredients,
// 		setUserDislikedIngredients,
// 		userParameters,
// 		setUserParameters,
// 		userEmail,
// 		setUserEmail,
// 		authToken,
// 		setAuthToken,
// 		dataOne,
// 		setDataOne
// 	};

// 	return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
// };

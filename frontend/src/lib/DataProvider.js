"use client";

import React, { useState } from "react";

import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
	// initialize new states here
	const [userFavouriteMeals, setuserFavouriteMeals] = useState([]);
	const [userGeneratedMeals, setuserGeneratedMeals] = useState([]);
	const [userIngredients, setuserIngredients] = useState([]);
	const [userDislikedIngredients, setuserDislikedIngredients] = useState([]);
	const [userParameters, setuserParameters] = useState([]);
	const [userEmail, setUserEmail] = useState("");
	const [authToken, setAuthToken] = useState("");

	// pass the states to the context here
	const contextValue = {
		userFavouriteMeals,
		setuserFavouriteMeals,
		userIngredients,
		userGeneratedMeals,
		setuserGeneratedMeals,
		userIngredients,
		setuserIngredients,
		userDislikedIngredients,
		setuserDislikedIngredients,
		userParameters,
		setuserParameters,
		userEmail,
		setUserEmail,
		authToken,
		setAuthToken
	};

	return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

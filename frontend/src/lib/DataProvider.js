"use client";

import React, { useState } from "react";

import { DataContext } from "./DataContext";
import { useLocalStorageState } from "./useLocalStorageState";

export const DataProvider = ({ children }) => {
	// initialize new states here
	const [dataOne, setDataOne] = useState({ value: "old value - this should persist between pages" });
	const [dataTwo, setDataTwo] = useLocalStorageState("dataThree", {
		value: "old value - this should persist over refreshes"
	});

	// pass the states to the context here
	const contextValue = {
		dataOne,
		setDataOne,
		dataTwo,
		setDataTwo
	};

	return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

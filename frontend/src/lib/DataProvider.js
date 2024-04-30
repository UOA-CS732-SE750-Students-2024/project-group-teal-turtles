"use client";

import React, { useState } from "react";

import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
	// initialize new states here
	const [dataOne, setDataOne] = useState({ value: "this is data one" });
	const [dataTwo, setDataTwo] = useState({ value: "this is data two" });

  // pass the states to the context here
	const contextValue = {
		dataOne,
		setDataOne,
		dataTwo,
		setDataTwo
	};

	return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

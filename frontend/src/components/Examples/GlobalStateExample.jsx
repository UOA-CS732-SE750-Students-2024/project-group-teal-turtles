"use client";
import React from "react";
// import { useDataContext } from "@/lib/DataContext";
import useDataStore from "@/lib/store";

function GlobalStateExample() {
	// const { dataOne, setDataOne } = useDataContext();
	const { dataOne, setDataOne } = useDataStore();

	const handleClick = () => {
		setDataOne(dataOne === "hi" ? "hello" : "hi");
	};

	return <div onClick={handleClick}>{dataOne}</div>;
}

export default GlobalStateExample;

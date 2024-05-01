import React from "react";
import { useDataContext } from "@/lib/DataContext";

function GlobalStateExample() {
	const { dataOne, setDataOne } = useDataContext();

	const handleClick = () => {
		setDataOne({ value: "new value - this should persist between pages" });
	};

	return <div onClick={handleClick}>{JSON.stringify(dataOne)}</div>;
}

export default GlobalStateExample;

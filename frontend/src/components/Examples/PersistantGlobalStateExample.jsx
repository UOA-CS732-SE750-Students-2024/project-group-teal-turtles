import React from "react";
import { useDataContext } from "@/lib/DataContext";

function GlobalStateExample() {
	const { dataTwo, setDataTwo } = useDataContext();

	const handleClick = () => {
		setDataTwo({ value: "new value - this should persist over refreshes" });
	};

	return <div onClick={handleClick}>{JSON.stringify(dataTwo)}</div>;
}

export default GlobalStateExample;

"use client";

import Layout from "@/components/Layout/Layout";
import React from "react";
import useDataStore from "@/lib/store";

function GenerationOptions() {
	const { userParameters, setUserParameters } = useDataStore();
	return (
		<Layout>
			<div>GenerationOptions</div>
			<div>{userParameters.numberOfPeople}</div>
			<button onClick={() => setUserParameters({ numberOfPeople: 5 })}>set user params to 5</button>
		</Layout>
	);
}

export default GenerationOptions;

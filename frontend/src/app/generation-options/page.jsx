"use client";

import Layout from "@/components/Layout/Layout";
import React from "react";
import useDataStore from "@/lib/store";

function GenerationOptions() {
	const { userParameters, setUserParameters, userAuth } = useDataStore();
	return (
		<Layout>
			<div>GenerationOptions</div>
			<div>{userParameters ? userParameters.numberOfPeople : "loading"}</div>
			<button onClick={() => setUserParameters({ numberOfPeople: 5 })}>set user params to 5</button>
		</Layout>
	);
}

export default GenerationOptions;

"use client";

import Layout from "@/components/Layout/Layout";
import React from "react";
import useDataStore from "@/lib/store";
import GenerationButtons from "@/components/Generation/GenerationButtons";
import GenerationPreferences from "@/components/Generation/GenerationPreferences";
import { Stack, Typography, Container, Button, TextField, IconButton, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function GenerationOptions() {
	const { userParameters, setUserParameters, userAuth } = useDataStore();
	const [selectedNumIngredientsExtra, setSelectedNumIngredientsExtra] = useState(4);

	const searchParams = useSearchParams();

	const generateOptionParam = searchParams.get("generateOption");
	return (
		<Layout>
			<Container>
				<Typography variant="h2" align="center" gutterBottom sx={{ mt: "4vh" }}>
					Generation Type
				</Typography>
				<GenerationButtons generateOptionParam={generateOptionParam} />

				<GenerationPreferences
					generateOptionParam={generateOptionParam}
					userParameters={userParameters}
					setUserParameters={setUserParameters}
					selectedNumIngredientsExtra={selectedNumIngredientsExtra}
					setSelectedNumIngredientsExtra={setSelectedNumIngredientsExtra}
				/>
			</Container>
		</Layout>
	);
}

export default GenerationOptions;

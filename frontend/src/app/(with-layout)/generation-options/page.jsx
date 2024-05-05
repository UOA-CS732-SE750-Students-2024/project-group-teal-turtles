"use client";

import useDataStore from "@/lib/store";
import GenerationButtons from "@/components/Generation/GenerationButtons";
import GenerationPreferences from "@/components/Generation/GenerationPreferences";
import { Typography, Container } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function GenerationOptions() {
	const { userParameters, setUserParameters, userAuth } = useDataStore();
	const [selectedNumIngredientsExtra, setSelectedNumIngredientsExtra] = useState(4);

	const searchParams = useSearchParams();

	const generateOptionParam = searchParams.get("generateOption");
	return (
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
	);
}

export default GenerationOptions;

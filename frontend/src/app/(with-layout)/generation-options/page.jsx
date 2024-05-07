"use client";

import GenerationButtons from "@/components/Generation/GenerationButtons";
import GenerationPreferences from "@/components/Generation/GenerationPreferences";
import { Typography, Stack } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function GenerationOptions() {
	function Generation() {
		const searchParams = useSearchParams();
		const generateOptionParam = searchParams.get("generateOption");

		return (
			<Stack height="calc(100vh - 70px)" justifyContent="space-between">
				<Typography variant="h2" align="center" fontWeight="700">
					Generation Type
				</Typography>
				<GenerationButtons generateOptionParam={generateOptionParam} />
				<GenerationPreferences generateOptionParam={generateOptionParam} />
			</Stack>
		);
	}

	return (
		<Suspense>
			<Generation />
		</Suspense>
	);
}

export default GenerationOptions;

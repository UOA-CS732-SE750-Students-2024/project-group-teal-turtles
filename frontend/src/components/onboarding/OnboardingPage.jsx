"use client";

import CardWrapper from "@/components/CardWrapper";
import { Stack } from "@mui/material";
import { useState } from "react";
import { MealsPage } from "./MealsPage";
import { IngredientsPage } from "./IngredientsPage";

function OnboardingPage() {
	const [page, setPage] = useState("meals");

	const handlePageChange = (newPage) => {
		return () => {
			setPage(newPage);
		};
	};

	return (
		<CardWrapper>
			<Stack alignItems="center" width="700px">
				{page === "ingredients" ? (
					<IngredientsPage onPageChange={handlePageChange("meals")} />
				) : (
					<MealsPage onPageChange={handlePageChange("ingredients")} />
				)}
			</Stack>
		</CardWrapper>
	);
}

export default OnboardingPage;

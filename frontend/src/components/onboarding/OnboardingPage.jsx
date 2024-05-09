"use client";

import CardWrapper from "@/components/CardWrapper";
import { Stack } from "@mui/material";
import { useState } from "react";
import { MealsPage } from "./MealsPage";
import { IngredientsPage } from "./IngredientsPage";

/**
 * Renders the onboarding page.
 * @returns {JSX.Element} The rendered component.
 */
function OnboardingPage() {
	const [page, setPage] = useState("meals");

	const handlePageChange = (newPage) => {
		return () => {
			setPage(newPage);
		};
	};

	/**
	 * Handles the change of the onboarding page.
	 * @param {string} newPage - The new page to navigate to.
	 * @returns {Function} The function to handle page change.
	 */
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

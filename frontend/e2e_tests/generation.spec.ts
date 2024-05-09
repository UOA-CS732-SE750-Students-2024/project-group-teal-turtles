import { test, expect } from "@playwright/test";

test("generation for basic", async ({ page }) => {
	await page.goto("/landing");
	await page.getByRole("button", { name: "Sign In" }).click();
	await page.getByLabel("Email Address").click();
	await page.getByLabel("Email Address").fill("nbel@gmail.com");
	await page.getByLabel("Password (6+ Characters)").click();
	await page.getByLabel("Password (6+ Characters)").fill("nathan");
	await page.getByRole("button", { name: "Sign in", exact: true }).click();
	await page.getByRole("button", { name: "Basic Will use ingredients in" }).click();
	await page.getByRole("button", { name: "Generate Meal!" }).click();

	await expect(page.getByRole("heading", { name: "Generating recipe..." })).toBeVisible();
	await page.waitForTimeout(30000);
	await expect(page.getByRole("heading", { name: "Ingredients needed from Pantry" })).toBeVisible();
	await expect(page.getByRole("heading", { name: "Ingredients needed outside" })).toBeVisible();
	await expect(page.getByRole("heading", { name: "Instructions" })).toBeVisible();
});

test("generation for remix", async ({ page }) => {
	await page.goto("/landing");
	await page.getByRole("button", { name: "Sign In" }).click();
	await page.getByLabel("Email Address").click();
	await page.getByLabel("Email Address").fill("nbel@gmail.com");
	await page.getByLabel("Password (6+ Characters)").click();
	await page.getByLabel("Password (6+ Characters)").fill("nathan");
	await page.getByRole("button", { name: "Sign in", exact: true }).click();

	await page.getByRole("button", { name: "Generate", exact: true }).click();
	await page.getByRole("button", { name: "Remix" }).click();
	await page.getByPlaceholder("Meal to Remix").click();
	await page.getByPlaceholder("Meal to Remix").fill("Nachos");
	await page.getByRole("button", { name: "Generate Meal!" }).click();

	await expect(page.getByRole("heading", { name: "Generating recipe..." })).toBeVisible();
	await page.waitForTimeout(30000);
	await expect(page.locator("h6").filter({ hasText: "Ingredients" })).toBeVisible();
});

test("generation for prompt", async ({ page }) => {
	await page.goto("/landing");
	await page.getByRole("button", { name: "Sign In" }).click();
	await page.getByLabel("Email Address").click();
	await page.getByLabel("Email Address").fill("nbel@gmail.com");
	await page.getByLabel("Password (6+ Characters)").click();
	await page.getByLabel("Password (6+ Characters)").fill("nathan");
	await page.getByRole("button", { name: "Sign in", exact: true }).click();

	await page.getByRole("button", { name: "Generate", exact: true }).click();
	await page.getByRole("button", { name: "Prompt" }).click();

	await page.getByPlaceholder("Generate a meal...").click();
	await page.getByPlaceholder("Generate a meal...").fill("chicken noodles");
	await page.locator(".MuiInputBase-root > .MuiButtonBase-root").click();

	await expect(page.getByRole("heading", { name: "Generating recipe..." })).toBeVisible();
	await page.waitForTimeout(30000);
	await expect(page.locator("h6").filter({ hasText: "Ingredients" })).toBeVisible();
});

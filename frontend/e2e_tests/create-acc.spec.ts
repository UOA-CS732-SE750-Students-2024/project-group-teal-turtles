import { test, expect } from "@playwright/test";

test("should allow create an account with profile", async ({ page }) => {
	await page.goto("/landing");
	await page.getByRole("button", { name: "Create Account" }).click();
	await page.getByLabel("Email Address").click();
	await page.getByLabel("Email Address").fill("test" + Math.random() + "@gmail.com");
	await page.getByLabel("Password (6+ Characters)").click();
	await page.getByLabel("Password (6+ Characters)").fill("123456");
	await page.getByLabel("Confirm Password").click();
	await page.getByLabel("Confirm Password").fill("123456");
	await page.getByRole("button", { name: "Create Account" }).click();
	await page.getByRole("button", { name: "Pizza Pizza" }).click();
	await page.getByRole("button", { name: "Continue" }).click();
	await page.getByRole("button", { name: "Bun Bun" }).click();
	await page.getByRole("button", { name: "Eggs Eggs" }).click();
	await page.getByRole("button", { name: "Butter Butter" }).click();
	await page.getByRole("button", { name: "Continue" }).click();
	await page.getByLabel("Profile").click();

	await expect(page).toHaveURL("http://localhost:3000/edit-profile");
	await expect(page.getByText("Pizza")).toBeVisible();
	await expect(page.getByText("Logout")).toBeVisible();
});

test("allows user to log in", async ({ page }) => {
	await page.goto("/landing");
	await page.getByRole("button", { name: "Sign In" }).click();
	await page.getByLabel("Email Address").fill("nbel@gmail.com");
	await page.getByLabel("Password (6+ Characters)").click();
	await page.getByLabel("Password (6+ Characters)").fill("nathan");
	await page.getByRole("button", { name: "Sign in", exact: true }).click();
	await page.getByLabel("Profile").click();

	await expect(page).toHaveURL("http://localhost:3000/edit-profile");
	await expect(page.getByRole("heading", { name: "Meal History (Last 10)" })).toBeVisible();
	await expect(page.getByRole("heading", { name: "Mexican Breakfast Burrito" })).toBeVisible();
	await expect(page.getByRole("heading", { name: "Logout" })).toBeVisible();
});

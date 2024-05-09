import { searchIngredients, categorizeIngredients } from "@/lib/SearchUtil";
import ingredients from "@/lib/ingredients.json";

describe("SearchUtil", () => {
	describe("searchIngredients", () => {
		it("should return correct search results", () => {
			const searchTerm = "Apple";
			const results = searchIngredients(searchTerm);
			expect(results).toEqual(expect.arrayContaining([expect.objectContaining({ title: "Apple" })]));
		});

		it("should return correct search results for a case-insensitive search", () => {
			const searchTerm = "apple";
			const results = searchIngredients(searchTerm);
			expect(results).toEqual(expect.arrayContaining([expect.objectContaining({ title: "Apple" })]));
		});

		it("should return correct search results for multiple matches", () => {
			const searchTerm = "ba";
			const results = searchIngredients(searchTerm);
			expect(results).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ title: "Bacon" }),
					expect.objectContaining({ title: "Bagel" })
				])
			);
		});

		it("should return empty array for no matches", () => {
			const results = searchIngredients("nonexistent ingredient");
			expect(results).toEqual([]);
		});
	});

	describe("categorizeIngredients", () => {
		it("should categorize ingredients correctly", () => {
			const categorized = categorizeIngredients(ingredients);
			expect(categorized).toHaveProperty("Beef");
			expect(categorized.Beef).toEqual(expect.arrayContaining([expect.objectContaining({ title: "Beef patty" })]));
		});

		it("should categorize ingredients correctly for multiple categories", () => {
			const ingredients = [
				{ title: "Apple", categories: ["Fruit"] },
				{ title: "Beef", categories: ["Meat"] },
				{ title: "Flour", categories: ["Baking"] },
				{ title: "Sugar", categories: ["Baking"] },
				{ title: "Cinnamon", categories: ["Spices"] }
			];
			const categorized = categorizeIngredients(ingredients);
			expect(categorized).toHaveProperty("Fruit");
			expect(categorized.Fruit).toEqual(expect.arrayContaining([expect.objectContaining({ title: "Apple" })]));

			expect(categorized).toHaveProperty("Meat");
			expect(categorized.Meat).toEqual(expect.arrayContaining([expect.objectContaining({ title: "Beef" })]));

			expect(categorized).toHaveProperty("Baking");
			expect(categorized.Baking).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ title: "Flour" }),
					expect.objectContaining({ title: "Sugar" })
				])
			);

			expect(categorized).toHaveProperty("Spices");
			expect(categorized.Spices).toEqual(expect.arrayContaining([expect.objectContaining({ title: "Cinnamon" })]));
		});
	});
});

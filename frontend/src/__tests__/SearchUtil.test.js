import { searchIngredients, categorizeIngredients } from "@/components/EditProfilePage/QuickSearch/SearchUtil";
import ingredients from "@/ingredients.json";

describe("SearchUtil", () => {
	test("categorizeIngredients should return an object with categories as keys", () => {
		const result = categorizeIngredients(ingredients);
		expect(typeof result).toBe("object");
		for (let key in result) {
			expect(Array.isArray(result[key])).toBe(true);
		}
	});

	test("categorizing a search should return a valid object", () => {
		const searchResult = searchIngredients("st");
		const result = categorizeIngredients(searchResult);
		expect(typeof result).toBe("object");
		for (let key in result) {
			expect(Array.isArray(result[key])).toBe(true);
		}
	});

	test("searching nothing should return all the ingredients", () => {
		const searchResult = searchIngredients("");
		expect(searchResult).toEqual(ingredients);
	});
});

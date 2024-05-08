import { searchIngredients, categorizeIngredients } from "@/components/EditProfilePage/QuickSearch/SearchUtil";

describe("SearchUtil", () => {
	test("searchIngredients should log categorized ingredients", () => {
		const consoleSpy = jest.spyOn(console, "log");
		searchIngredients("test");
		expect(consoleSpy).toHaveBeenCalled();
		consoleSpy.mockRestore();
	});

	test("categorizeIngredients should return an object with categories as keys", () => {
		const result = categorizeIngredients();
		expect(typeof result).toBe("object");
		for (let key in result) {
			expect(Array.isArray(result[key])).toBe(true);
		}
	});
});

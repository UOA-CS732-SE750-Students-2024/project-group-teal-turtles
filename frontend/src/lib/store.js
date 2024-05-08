import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDataStore = create(
	persist(
		(set) => ({
			userFavouriteMeals: [],
			userGeneratedMeals: [],
			userIngredients: [],
			userDislikedIngredients: [],
			userParameters: null,
			userEmail: null,
			authorisedUser: null,
			prompt: "",
			mealToRemix: "",
			lastMeal: "",
			lastRecipe: "",
			lastIngredientQuantities: [],
			lastIngredientsNeeded: [],
			lastIngredientsUser: [],
			setUserFavouriteMeals: (meals) => set({ userFavouriteMeals: meals }),
			setUserGeneratedMeals: (meals) => set({ userGeneratedMeals: meals }),
			setUserIngredients: (ingredients) => set({ userIngredients: ingredients }),
			setUserDislikedIngredients: (ingredients) => set({ userDislikedIngredients: ingredients }),
			setUserParameters: (parameters) => {
				set({ userParameters: parameters });
			},
			setUserEmail: (email) => set({ userEmail: email }),
			setPrompt: (prompt) => set({ prompt }),
			setMealToRemix: (mealToRemix) => set({ mealToRemix }),
			setAuthorisedUser: (authorisedUser) => set({ authorisedUser }),
			setLastMeal: (lastMeal) => set({ lastMeal }),
			setLastRecipe: (lastRecipe) => set({ lastRecipe }),
			setLastIngredientQuantities: (lastIngredientQuantities) => set({ lastIngredientQuantities }),
			setLastIngredientsNeeded: (lastIngredientsNeeded) => set({ lastIngredientsNeeded }),
			setLastIngredientsUser: (lastIngredientsUser) => set({ lastIngredientsUser })
		}),
		{
			name: "data-store3"
		}
	)
);

export default useDataStore;

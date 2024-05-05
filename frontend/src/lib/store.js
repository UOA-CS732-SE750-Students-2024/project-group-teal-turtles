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
			authToken: null,
			prompt: "",
			numIngredients: "",
			mealToRemix: "",
			setUserFavouriteMeals: (meals) => set({ userFavouriteMeals: meals }),
			setUserGeneratedMeals: (meals) => set({ userGeneratedMeals: meals }),
			setUserIngredients: (ingredients) => set({ userIngredients: ingredients }),
			setUserDislikedIngredients: (ingredients) => set({ userDislikedIngredients: ingredients }),
			setUserParameters: (parameters) => {
				set({ userParameters: parameters });
			},
			setUserEmail: (email) => set({ userEmail: email }),
			setAuthToken: (token) => set({ authToken: token }),
			setPrompt: (prompt) => set({ prompt }),
			setNumIngredients: (numIngredients) => set({ numIngredients }),
			setMealToRemix: (mealToRemix) => set({ mealToRemix })
		}),
		{
			name: "data-store3"
		}
	)
);

export default useDataStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDataStore = create(
	persist(
		(set) => ({
			userFavouriteMeals: null,
			userGeneratedMeals: null,
			userIngredients: null,
			userDislikedIngredients: null,
			userParameters: null,
			userEmail: null,
			authToken: null,
			dataOne: null,
			setUserFavouriteMeals: (meals) => set({ userFavouriteMeals: meals }),
			setUserGeneratedMeals: (meals) => set({ userGeneratedMeals: meals }),
			setUserIngredients: (ingredients) => set({ userIngredients: ingredients }),
			setUserDislikedIngredients: (ingredients) => set({ userDislikedIngredients: ingredients }),
			setUserParameters: (parameters) => set({ userParameters: parameters }),
			setUserEmail: (email) => set({ userEmail: email }),
			setAuthToken: (token) => set({ authToken: token }),
			setDataOne: (data) => set({ dataOne: data })
		}),
		{
			name: "data-store"
		}
	)
);

export default useDataStore;

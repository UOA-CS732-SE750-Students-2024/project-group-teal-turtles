import axios from "axios";

export function saveIngredients(authToken, userIngredients) {
	axios.put(
		process.env.NEXT_PUBLIC_BACKEND_URL + "/users/ingredients",
		{
			ingredients: userIngredients
		},
		{
			headers: {
				Authorization: authToken
			}
		}
	);
}

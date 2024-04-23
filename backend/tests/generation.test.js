import express from "express";
import request from "supertest";
import routes from "../src/routes/routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

describe("GET /basicStrict", () => {
	it("no params", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/basicStrict")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("meal type", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake, Omlete"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "Breakfast",
			cuisine: "",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/basicStrict")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("cuisine", (done) => {
		const payload = {
			favouriteMeals: [""],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "Asian",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/basicStrict")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("diatary requirement", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: "vegetarian"
		};

		request(app)
			.get("/api/generation/basicStrict")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);
});

describe("GET /basicLoose", () => {
	it("no params", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: "",
			numberOfAdditionalIngredients: "5"
		};

		request(app)
			.get("/api/generation/basicLoose")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("meal type", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake, Omlete"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "Breakfast",
			cuisine: "",
			dietaryRequirements: "",
			numberOfAdditionalIngredients: "5"
		};

		request(app)
			.get("/api/generation/basicLoose")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("cuisine", (done) => {
		const payload = {
			favouriteMeals: [""],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "Asian",
			dietaryRequirements: "",
			numberOfAdditionalIngredients: "5"
		};

		request(app)
			.get("/api/generation/basicLoose")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);

	it("diatary requirement", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: {
				VegetablesAndFruit: ["Raisins", "Apple", "Mushrooms"],
				Dairy: ["Milk", "Cheese"],
				Meat: ["Steak", "Chicken"],
				Baking: ["Flour", "Sugar"],
				Carbs: ["Bread", "Potato"],
				Other: []
			},
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: "vegetarian",
			numberOfAdditionalIngredients: "5"
		};

		request(app)
			.get("/api/generation/basicLoose")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);
});

// describe("GET /remix", () => {
// 	it("gets all breakfasts from server", (done) => {
// 		request(app)
// 			.get("/breakfasts")
// 			.send() // Send the request. If we were sending a POST request, we would send the data as an argument to this function.
// 			.expect(200)
// 			.end((err, res) => {});
// 	});
// });

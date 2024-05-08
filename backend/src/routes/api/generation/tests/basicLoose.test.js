import express from "express";
import request from "supertest";
import routes from "../../../routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

describe("GET /basicLoose", () => {
	it("no params", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: [
				"Raisins",
				"Apple",
				"Mushrooms",
				"Milk",
				"Cheese",
				"Steak",
				"Chicken",
				"Flour",
				"Sugar",
				"Bread",
				"Potato"
			],
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: "",
			numberOfAdditionalIngredients: "5"
		};

		request(app)
			.post("/api/generation/basicLoose")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return done();
			});
	}, 15000);

	it("meal type", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake, Omlete"],
			ingredients: [
				"Raisins",
				"Apple",
				"Mushrooms",
				"Milk",
				"Cheese",
				"Steak",
				"Chicken",
				"Flour",
				"Sugar",
				"Bread",
				"Potato"
			],
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "Breakfast",
			cuisine: "",
			dietaryRequirements: "",
			numberOfAdditionalIngredients: "5"
		};

		request(app)
			.post("/api/generation/basicLoose")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return done();
			});
	}, 15000);

	it("cuisine", (done) => {
		const payload = {
			favouriteMeals: [""],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: [
				"Raisins",
				"Apple",
				"Mushrooms",
				"Milk",
				"Cheese",
				"Steak",
				"Chicken",
				"Flour",
				"Sugar",
				"Bread",
				"Potato"
			],
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "Asian",
			dietaryRequirements: "",
			numberOfAdditionalIngredients: "5"
		};

		request(app)
			.post("/api/generation/basicLoose")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return done();
			});
	}, 15000);

	it("diatary requirement", (done) => {
		const payload = {
			favouriteMeals: ["Pancakes", "Waffles"],
			generatedMeals: ["Cheesy Mushroom Potato Bake"],
			ingredients: [
				"Raisins",
				"Apple",
				"Mushrooms",
				"Milk",
				"Cheese",
				"Steak",
				"Chicken",
				"Flour",
				"Sugar",
				"Bread",
				"Potato"
			],
			dislikedIngredients: ["Capsicum", "carrots"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: "vegetarian",
			numberOfAdditionalIngredients: "5"
		};

		request(app)
			.post("/api/generation/basicLoose")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return done();
			});
	}, 15000);
});

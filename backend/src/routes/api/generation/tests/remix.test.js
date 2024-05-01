import express from "express";
import request from "supertest";
import routes from "../../../routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

describe("GET /remix", () => {
	it("no params", (done) => {
		const payload = {
			mealToRemix: "beef mince nachos",
			favouriteMeals: ["Pancakes", "Waffles"],
			dislikedIngredients: ["carrots", "capsicum"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/remix")
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
			mealToRemix: "beef mince nachos",
			favouriteMeals: ["Pancakes", "Waffles"],
			dislikedIngredients: ["carrots", "capsicum"],
			mealType: "Dinner",
			cuisine: "",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/remix")
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
			mealToRemix: "full english breakfast",
			favouriteMeals: ["Pancakes", "Waffles"],
			dislikedIngredients: ["carrots", "capsicum"],
			mealType: "",
			cuisine: "Asian",
			dietaryRequirements: ""
		};

		request(app)
			.get("/api/generation/remix")
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
	it("dietary requirement", (done) => {
		const payload = {
			mealToRemix: "strawberry cheesecake",
			favouriteMeals: ["Pancakes", "Waffles"],
			dislikedIngredients: ["carrots", "capsicum"],
			mealType: "",
			cuisine: "",
			dietaryRequirements: "vegetarian"
		};

		request(app)
			.get("/api/generation/remix")
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

import request from "supertest";
import axios from "axios";
import mongoose from "mongoose";

const app = require("../../../../app.js");
var authToken;
var badAuthToken;
beforeAll(async () => {
	const API_KEY = process.env.TESTING_FIREBASE_API_KEY;
	const response = await axios.post(
		"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
		{
			email: "1234@gmail.com",
			password: "1234567",
			returnSecureToken: true
		}
	);
	authToken = response.data.idToken;

	const response2 = await axios.post(
		"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + API_KEY,
		{
			email: "12345@gmail.com",
			password: "1234567",
			returnSecureToken: true
		}
	);
	badAuthToken = response2.data.idToken;
	await mongoose.connect(process.env.DB_URL);
}, 15000);

describe("API: /api/users/ingredients", () => {
	describe("GET /api/users/ingredients", () => {
		it("should return user's ingredient data", (done) => {
			request(app)
				.get("/api/users/ingredients")
				.set("Authorization", authToken)
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(res.body).toHaveProperty("VegetablesAndFruit");
					return done();
				});
		}, 15000);

		it("should return 401 Unauthorized for bad token", (done) => {
			request(app).get("/api/users/ingredients").set("Authorization", badAuthToken).expect(404, done);
		}, 15000);
	});

	describe("PUT /api/users/ingredients", () => {
		it("should update the user's ingredients", (done) => {
			const updatedIngredients = {
				VegetablesAndFruit: ["Carrot", "Cucumber"],
				Dairy: ["Yogurt"],
				Meat: ["Pork"],
				Baking: ["Butter"],
				Carbs: ["Quinoa"],
				Other: ["Pepper"]
			};

			request(app)
				.put("/api/users/ingredients")
				.send({ ingredients: updatedIngredients })
				.set("Authorization", authToken)
				.expect(204, done);
		}, 15000);

		it("should return 400 when required fields are missing", (done) => {
			const incompleteIngredients = {
				VegetablesAndFruit: ["Carrot"]
			};

			request(app)
				.put("/api/users/ingredients")
				.send({ ingredients: incompleteIngredients })
				.set("Authorization", authToken)
				.expect(400)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(res.body.error).toBeDefined();
					return done();
				});
		}, 15000);
	});
	describe("PUT /api/users/ingredients/type", () => {
		it("should set specific ingredient type list", (done) => {
			const payload = {
				ingredientType: "VegetablesAndFruit",
				ingredients: ["Tomato", "Spinach", "Broccoli"]
			};
			request(app).put("/api/users/ingredients/type").set("Authorization", authToken).send(payload).expect(204, done);
		}, 15000);

		it("should return 400 for invalid ingredient type", (done) => {
			request(app)
				.put("/api/users/ingredients/type")
				.send({ ingredientType: "InvalidType", ingredients: ["Something"] })
				.set("Authorization", authToken)
				.expect(400, done);
		}, 15000);
	});
	describe("PUT /api/users/ingredients/disliked/add", () => {
		it("should add a disliked ingredient", (done) => {
			const dislikedIngredientToAdd = "Olives";

			request(app)
				.put("/api/users/ingredients/disliked/add")
				.send({ dislikedIngredientToAdd })
				.set("Authorization", authToken)
				.expect(204, done);
		}, 15000);

		it("should return 400 if no disliked ingredient is provided", (done) => {
			request(app)
				.put("/api/users/ingredients/disliked/add")
				.send({})
				.set("Authorization", authToken)
				.expect(400, done);
		}, 15000);
	});

	describe("PUT /api/users/ingredients/disliked/remove", () => {
		it("should remove a disliked ingredient", (done) => {
			const dislikedIngredientToRemove = "Olives";

			request(app)
				.put("/api/users/ingredients/disliked/remove")
				.send({ dislikedIngredientToRemove })
				.set("Authorization", authToken)
				.expect(204, done);
		}, 15000);

		it("should return 400 if no disliked ingredient is provided for removal", (done) => {
			request(app)
				.put("/api/users/ingredients/disliked/remove")
				.send({})
				.set("Authorization", authToken)
				.expect(400, done);
		}, 15000);
	});

	describe("GET /api/users/ingredients/disliked", () => {
		it("should return all disliked ingredients for a user", (done) => {
			request(app)
				.get("/api/users/ingredients/disliked")
				.set("Authorization", authToken)
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(Array.isArray(res.body)).toBeTruthy();
					return done();
				});
		}, 15000);

		it("should return 401 Unauthorized for bad token", (done) => {
			request(app).get("/api/users/ingredients/disliked").set("Authorization", badAuthToken).expect(404, done);
		}, 15000);
	});
});

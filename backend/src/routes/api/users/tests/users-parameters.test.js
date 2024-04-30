import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const app = require("./middleware.js");
const authToken = "user1";
const authToken2 = "user2";
const authToken3 = "user3";
const badAuthToken = "user4";

let mongod;

const user1 = {
	_id: "user1",
	favouriteMeals: [],
	generatedMeals: ["Chicken Curry", "Quinoa Salad"],
	ingredients: {
		VegetablesAndFruit: ["Carrot", "Cucumber"],
		Dairy: ["Yogurt"],
		Meat: ["Pork"],
		Baking: ["Butter"],
		Carbs: ["Quinoa"],
		Other: ["Pepper"]
	},
	dislikedIngredients: [],
	parameters: { numberOfPeople: 4, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
};

const user2 = {
	_id: "user2",
	favouriteMeals: ["Chicken Curry"],
	generatedMeals: [],
	ingredients: {
		VegetablesAndFruit: ["Carrot", "Cucumber"],
		Dairy: ["Yogurt"],
		Meat: ["Pork"],
		Baking: ["Butter"],
		Carbs: ["Quinoa"],
		Other: ["Pepper"]
	},
	dislikedIngredients: [],
	parameters: { numberOfPeople: 4, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
};
const user3 = {
	_id: "user3",
	favouriteMeals: [],
	generatedMeals: [],
	ingredients: {
		VegetablesAndFruit: ["Carrot", "Cucumber"],
		Dairy: ["Yogurt"],
		Meat: ["Pork"],
		Baking: ["Butter"],
		Carbs: ["Quinoa"],
		Other: ["Pepper"]
	},
	dislikedIngredients: ["Olives"],
	parameters: { numberOfPeople: 4, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
};

const users = [user1, user2, user3];

beforeAll(async () => {
	mongod = await MongoMemoryServer.create();

	const connectionString = mongod.getUri();
	await mongoose.connect(connectionString);
	await mongoose.connection.db.dropDatabase();
});

beforeEach(async () => {
	// Drop existing db
	await mongoose.connection.db.dropDatabase();
	const coll = await mongoose.connection.db.createCollection("Users");
	await coll.insertMany(users);
});

describe("API: /api/users/parameters", () => {
	describe("PUT /api/users/parameters", () => {
		it("should update the user's parameters", (done) => {
			const parameters = {
				numberOfPeople: 4,
				mealType: "dinner",
				cuisine: "Italian",
				dietaryRequirements: ["vegetarian", "gluten-free"]
			};

			request(app)
				.put("/api/users/parameters")
				.set("Authorization", authToken)
				.send({ parameters })
				.expect(204)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					return done();
				});
		}, 15000);

		it("should return 400 when parameters are missing", (done) => {
			request(app)
				.put("/api/users/parameters")
				.set("Authorization", authToken)
				.send({})
				.expect(400)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(res.body.error).toBeDefined();
					return done();
				});
		}, 15000);

		it("should return 400 when required fields are missing", (done) => {
			const incompleteParameters = {
				mealType: "dinner"
			};

			request(app)
				.put("/api/users/parameters")
				.set("Authorization", authToken)
				.send({ parameters: incompleteParameters })
				.expect(400, done);
		}, 15000);

		it("should return 400 for invalid mealType", (done) => {
			const invalidParameters = {
				numberOfPeople: 2,
				mealType: "snack",
				cuisine: "Mexican",
				dietaryRequirements: ["gluten-free"]
			};

			request(app)
				.put("/api/users/parameters")
				.set("Authorization", authToken)
				.send({ parameters: invalidParameters })
				.expect(400, done);
		}, 15000);
	});

	describe("GET /api/users/parameters", () => {
		it("should retrieve the user's parameters", (done) => {
			request(app)
				.get("/api/users/parameters")
				.set("Authorization", authToken)
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					expect(res.body).toHaveProperty("numberOfPeople");
					return done();
				});
		}, 15000);

		it("should return 404 Not Found for bad token", (done) => {
			request(app).get("/api/users/parameters").set("Authorization", badAuthToken).expect(404, done);
		}, 15000);
	});
});

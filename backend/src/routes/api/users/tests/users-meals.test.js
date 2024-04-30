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
	parameters: { numberOfPeople: { $numberInt: "4" }, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
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
	parameters: { numberOfPeople: { $numberInt: "4" }, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
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
	parameters: { numberOfPeople: { $numberInt: "4" }, mealType: "dinner", cuisine: "", dietaryRequirements: [] }
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

describe("API: /api/users/meals", () => {
	describe("PUT /api/users/meals/favourite/add", () => {
		it("should add a new favorite meal", (done) => {
			const favMealToAdd = "Chicken Curry";

			request(app)
				.put("/api/users/meals/favourite/add")
				.set("Authorization", authToken)
				.send({ favMealToAdd })
				.expect(201)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					return done();
				});
		}, 15000);

		it("should return 400 when 'favMealToAdd' is missing", (done) => {
			request(app).put("/api/users/meals/favourite/add").set("Authorization", authToken).send({}).expect(400, done);
		}, 15000);
	});

	describe("PUT /api/users/meals/favourite/remove", () => {
		it("should remove a favorite meal", (done) => {
			const favMealToDelete = "Chicken Curry";

			request(app)
				.put("/api/users/meals/favourite/remove")
				.set("Authorization", authToken2)
				.send({ favMealToDelete })
				.expect(204)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					return done();
				});
		}, 15000);

		it("should return 400 when 'favMealToDelete' is missing", (done) => {
			request(app).put("/api/users/meals/favourite/remove").set("Authorization", authToken).send({}).expect(400, done);
		}, 15000);
	});

	describe("GET /api/users/meals/favourite", () => {
		it("should retrieve the user's favorite meals", (done) => {
			request(app)
				.get("/api/users/meals/favourite")
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
			request(app).get("/api/users/meals/favourite").set("Authorization", badAuthToken).expect(404, done);
		}, 15000);
	});

	describe("PUT /api/users/meals", () => {
		it("should add a new generated meal", (done) => {
			const mealToAdd = "Spaghetti Carbonara";

			request(app)
				.put("/api/users/meals")
				.set("Authorization", authToken)
				.send({ mealToAdd })
				.expect(201)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					return done();
				});
		}, 15000);

		it("should return 400 when 'mealToAdd' is missing", (done) => {
			request(app).put("/api/users/meals").set("Authorization", authToken).send({}).expect(400, done);
		}, 15000);
	});

	describe("GET /api/users/meals/", () => {
		it("should retrieve all generated meals for a user", (done) => {
			request(app)
				.get("/api/users/meals/")
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
			request(app).get("/api/users/meals/").set("Authorization", badAuthToken).expect(404, done);
		}, 15000);
	});
});

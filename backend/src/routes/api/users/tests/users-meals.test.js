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
				.set("Authorization", authToken)
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
			const mealToAdd = "Spaghetti Carbonara" + Math.random();

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

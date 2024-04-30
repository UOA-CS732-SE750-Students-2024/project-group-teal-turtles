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

import request from "supertest";
import axios from "axios";
import mongoose from "mongoose";
import app from "../../../../app.js";

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

describe("GET /", () => {
	it("should return user data when the user is found", (done) => {
		request(app)
			.get("/api/users/")
			.set("Authorization", authToken)
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				expect(res.body).toHaveProperty("favouriteMeals");
				return done();
			});
	}, 15000);

	it("should return 404 when the user is not found", async () => {
		const res = await request(app).get("/api/users/").set("Authorization", badAuthToken);

		expect(404);
	}, 15000);

	it("should return 401 for bad token", async () => {
		const res = await request(app).get("/api/users/").set("Authorization", "Bearer error_trigger_token");

		expect(401);
	}, 15000);
});

describe("POST /", () => {
	it("should create a new user", (done) => {
		request(app)
			.post("/api/users/")
			.set("Authorization", badAuthToken)
			.expect(201)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return done();
			});
	}, 15000);
});

describe("DELETE /", () => {
	it("should delete a new user", (done) => {
		request(app)
			.delete("/api/users/")
			.set("Authorization", badAuthToken)
			.expect(204)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				return done();
			});
	}, 15000);
});

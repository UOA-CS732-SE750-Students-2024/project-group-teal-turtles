import express from "express";
import request from "supertest";
import routes from "../../../routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

describe("GET /recipe", () => {
	it("", (done) => {
		const payload = {
			mealName: "Vegan Apple Raisin Pancakes",
			ingredients: ["Raisins", "Apple", "Milk", "Flour", "Sugar"],
			numberOfPeople: "5"
		};

		request(app)
			.post("/api/generation/recipe")
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

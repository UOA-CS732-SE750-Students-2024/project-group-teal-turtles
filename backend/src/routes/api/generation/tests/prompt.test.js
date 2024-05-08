import express from "express";
import request from "supertest";
import routes from "../../../routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

describe("GET /remix", () => {
	it("pancakes", (done) => {
		const payload = {
			prompt: "I would like to make some pancakes"
		};

		request(app)
			.post("/api/generation/prompt")
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
	it("beef nachos", (done) => {
		const payload = {
			prompt: "Beef Nachos"
		};

		request(app)
			.post("/api/generation/prompt")
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

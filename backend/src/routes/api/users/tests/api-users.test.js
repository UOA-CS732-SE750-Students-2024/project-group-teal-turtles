//TESTS GET, POST, DEL for a user
import express from "express";
import request from "supertest";
import routes from "../../../routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

describe("GET /user", () => {
	it("get exisiting user", (done) => {
		const payload = {
			uid: "id1"
		};

		request(app)
			.get("/api/users/")
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

	it("get non-exisiting user", (done) => {
		const payload = {
			uid: "userThatDoesNotExist"
		};

		request(app)
			.get("/api/users/")
			.set("Content-Type", "application/json")
			.send(JSON.stringify(payload))
			.expect(404)
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				console.log(res.text);
				return done();
			});
	}, 15000);
});

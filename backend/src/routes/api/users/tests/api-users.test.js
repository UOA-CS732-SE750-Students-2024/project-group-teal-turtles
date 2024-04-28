//TESTS GET, POST, DEL for a user
import express from "express";
import request from "supertest";
import routes from "../../../routes.js";

const app = express();
app.use(express.json());
app.use("/", routes);

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = require("../../../../app.js");
// import app from "./app.js";

await mongoose.connect(process.env.DB_URL);
const PORT = process.env.PORT ?? 3000;
app.listen(3000, () => console.log(`Express Server is up and running on ${PORT}`));

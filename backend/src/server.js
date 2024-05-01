import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();

await mongoose.connect(process.env.DB_URL);
const PORT = process.env.PORT ?? 3000;
app.listen(3000, () => console.log(`Express Server is up and running on ${PORT}`));

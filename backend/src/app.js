import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

const PORT = process.env.PORT ?? 3000;
app.listen(3000, () => console.log(`Express Server is up and running on ${PORT}`));

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database");

import { User } from "./schema.js";
import { retrieveUser, createUser, addFavouriteMeal } from "./user-dao.js";

User.deleteMany({})
  .then(() => createUser("id1"))
  .then(() => addFavouriteMeal("id1", "cheese burger"))
  .then(() => {
    return retrieveUser("id1");
  })
  .then((user) => {
    console.log(user.favouriteMeals);
  });

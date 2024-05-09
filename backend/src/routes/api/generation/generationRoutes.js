import { Router } from "express";

const generation = Router();

import basicStrict from "./basicStrict.js";
generation.use("/basicStrict", basicStrict);

import basicLoose from "./basicLoose.js";
generation.use("/basicLoose", basicLoose);

import remix from "./remix.js";
generation.use("/remix", remix);

import prompt from "./prompt.js";
generation.use("/prompt", prompt);

import recipe from "./recipe.js";
generation.use("/recipe", recipe);

import mealImage from "./mealImage.js";
generation.use("/mealImage", mealImage);

export default generation;

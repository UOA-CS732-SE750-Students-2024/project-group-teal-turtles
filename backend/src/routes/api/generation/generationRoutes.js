import { Router } from "express";

const generation = Router();

import basic from "./basic.js";
generation.use("/basic", basic);

import freeForm from "./freeForm.js";
generation.use("/basic", freeForm);

import remix from "./remix.js";
generation.use("/basic", remix);

import prompt from "./prompt.js";
generation.use("/basic", prompt);

export default generation;

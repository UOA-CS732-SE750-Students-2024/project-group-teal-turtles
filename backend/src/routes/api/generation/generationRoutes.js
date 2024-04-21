import { Router } from "express";

const generation = Router();

import basic from "./basic.js";
generation.use("/basic", basic);

import freeForm from "./freeForm.js";
generation.use("/freeForm", freeForm);

import remix from "./remix.js";
generation.use("/remix", remix);

import prompt from "./prompt.js";
generation.use("/prompt", prompt);

export default generation;

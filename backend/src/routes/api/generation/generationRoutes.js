import { Router } from "express";

const generation = Router();

import basicStrict from "./basicStrict.js";
generation.use("/basicStrict", basicStrict);

import basicLoose from "./basicLoose.js";
generation.use("/basicLoose", basicLoose);

import freeForm from "./freeForm.js";
generation.use("/freeForm", freeForm);

import remix from "./remix.js";
generation.use("/remix", remix);

import prompt from "./prompt.js";
generation.use("/prompt", prompt);

export default generation;

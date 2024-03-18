import express from "express";

import secureRoute from "../utils/secureRoute.js";
import { getAllPeeps } from "../controllers/peepsControllers/getAllPeeps.controller.js";
import { addPeep } from "../controllers/peepsControllers/addPeep.controller.js";

export const router = express.Router();

router.route("/").get(getAllPeeps).post(secureRoute, addPeep);

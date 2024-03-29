import express from "express";

import secureRoute from "../utils/secureRoute.js";
import { getAllPeeps } from "../controllers/peepsControllers/getAllPeeps.controller.js";
import { addPeep } from "../controllers/peepsControllers/addPeep.controller.js";
import { updatePeep } from "../controllers/peepsControllers/updatePeep.controller.js";
import { deletePeep } from "../controllers/peepsControllers/deletePeep.controller.js";
import { getSinglePeep } from "../controllers/peepsControllers/getSinglePeep.controller.js";
import { addPeepReply } from "../controllers/peepsControllers/addPeepReply.controller.js";

export const router = express.Router();

router.route("/").get(getAllPeeps).post(secureRoute, addPeep);

router
	.route("/:id")
	.get(getSinglePeep)
	.put(secureRoute, updatePeep)
	.delete(secureRoute, deletePeep);

router.route("/reply/:id").post(secureRoute, addPeepReply);

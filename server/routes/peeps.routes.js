import express from "express";

import { getAllPeeps } from "../controllers/peepsControllers/getAllPeeps.controller.js";

export const router = express.Router();

router.route("/")
  .get(getAllPeeps)
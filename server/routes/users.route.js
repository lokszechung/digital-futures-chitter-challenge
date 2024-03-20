import express from "express";

import { registerUser } from "../controllers/usersControllers/registerUser.controller.js";
import { loginUser } from "../controllers/usersControllers/loginUser.controller.js";
import { getSingleUser } from "../controllers/usersControllers/getSingleUser.controller.js";

export const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/:id").get(getSingleUser);

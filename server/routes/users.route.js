import express from "express";

import { registerUser } from "../controllers/usersControllers/registerUser.controller.js";

export const router = express.Router();

router.route("/register")
  .post(registerUser)
// router.route("/")
//   .get(getAllUsers)
import express from "express";

import secureRoute from "../utils/secureRoute.js";

import { getNotifications } from "../controllers/notificationsControllers/getNotifications.controller.js";
import { updateNotification } from "../controllers/notificationsControllers/updateNotification.controller.js";

export const router = express.Router();

router.route("/").get(secureRoute, getNotifications);
router.route("/:id").put(secureRoute, updateNotification);

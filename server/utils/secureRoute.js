import { config } from "dotenv";
import { Unauthorised } from "./errors.js";
// import { sendErrors } from './helpers.js'
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

config({ path: `.env.${process.env.NODE_ENV}` });

const secureRoute = async (req, res, next) => {
	try {
		const auth = req.headers.authorization;
		if (!auth) {
			throw new Unauthorised("Missing headers");
		}

		const token = auth.replace("Bearer ", "");

		const payload = jwt.verify(token, process.env.SECRET);

		const userToVerify = await User.findById(payload.sub);

		if (!userToVerify) {
			throw new Unauthorised("User not found");
		}

		req.currentUser = userToVerify;

		next();
	} catch (err) {
		// console.log(err);
		return res.status(err.status).json({ message: err.message });
	}
};

export default secureRoute;

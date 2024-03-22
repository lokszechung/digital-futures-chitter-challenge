import User from "../../models/user.model.js";
import { Unauthorised } from "../../utils/errors.js";
import validateEmail from "../../utils/validateEmail.js";
import jwt from "jsonwebtoken";

export const loginUserService = {
	loginUser: async ({ usernameOrEmail, password }) => {
		const isEmail = validateEmail(usernameOrEmail);

		let user;

		if (isEmail) {
			user = await User.findOne({ email: usernameOrEmail });
		} else {
			user = await User.findOne({ username: usernameOrEmail });
		}

		if (!user || !user.validatePassword(password)) {
			throw new Unauthorised();
		}

		const payload = {
			sub: user._id,
			firstname: user.firstname,
			lastname: user.lastname,
		};

		const token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: "1h",
		});

		return { user, token };
	},
};

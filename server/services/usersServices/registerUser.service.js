import jwt from "jsonwebtoken";

import User from "../../models/user.model.js";

export const registerUserService = {
	registerUser: async (requestBody) => {
		const user = await User.create(requestBody);

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

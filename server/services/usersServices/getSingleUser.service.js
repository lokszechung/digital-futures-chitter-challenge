import User from "../../models/user.model.js";

export const getSingleUserService = {
	getSingleUser: async (id) => {
		const user = await User.findById(id);
		return user;
	},
};

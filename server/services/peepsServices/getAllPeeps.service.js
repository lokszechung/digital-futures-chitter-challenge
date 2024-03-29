import Peep from "../../models/peep.model.js";

export const getAllPeepsService = {
	getAllPeeps: async () => {
		const peeps = await Peep.find()
			.populate({
				path: "author",
				model: "User",
			})
			.populate({
				path: "replies",
				populate: { path: "author", model: "User" },
			});
		return peeps;
	},
};

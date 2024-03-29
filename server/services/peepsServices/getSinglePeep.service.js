import Peep from "../../models/peep.model.js";

export const getSinglePeepService = {
	getSinglePeep: async (_res, req, populations) => {
		const peep = await Peep.findById(req.params.id)
			.populate({
				path: "author",
				model: "User",
			})
			.populate({
				path: "replies",
				populate: { path: "author", model: "User" },
			});
		if (!peep) {
			throw new Error("Peep not found");
		}
		return peep;
	},
};

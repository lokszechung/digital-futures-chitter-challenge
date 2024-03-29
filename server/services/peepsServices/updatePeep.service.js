import Peep from "../../models/peep.model.js";

export const updatePeepService = {
	updatePeep: async (req) => {
		// const { id } = req.params;
		const peep = await Peep.findById(req.params.id);
		if (!peep) {
			throw new Error("Peep not found");
		}
		if (peep && req.currentUser._id.equals(peep.author._id)) {
			Object.assign(peep, req.body);
			await peep.save();
			return peep;
		}
	},
};

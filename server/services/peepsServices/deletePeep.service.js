import Peep from "../../models/peep.model.js";

export const deletePeepService = {
	deletePeep: async (req) => {
		const { id } = req.params;
		const peep = await Peep.findById(id);
		if (!peep) {
			throw new Error("Peep not found");
		}
		if (peep && req.currentUser._id.equals(peep.author._id)) {
			await Peep.deleteOne({ _id: id });
		}
		return;
	},
};

import Peep from "../../models/peep.model.js";
import { Unauthorised } from "../../utils/errors.js";

export const deletePeepService = {
	deletePeep: async (req) => {
		const { id } = req.params;
		const peep = await Peep.findById(id);
		if (!peep) {
			throw new Error("Peep not found");
		}
		if (peep && req.currentUser._id.toString() !== peep.author._id.toString()) {
			throw new Unauthorised();
		}
		if (peep && req.currentUser._id.toString() === peep.author._id.toString()) {
			await Peep.deleteOne({ _id: id });
		}
		return;
	},
};

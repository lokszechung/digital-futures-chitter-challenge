import Peep from "../../models/peep.model.js";
import { Unauthorised } from "../../utils/errors.js";

export const updatePeepService = {
	updatePeep: async (req) => {
		const peep = await Peep.findById(req.params.id);
		if (!peep) {
			throw new Error("Peep not found");
		}
		if (peep && req.currentUser._id.toString() !== peep.author._id.toString()) {
			throw new Unauthorised();
		}
		if (peep && req.currentUser._id.toString() === peep.author._id.toString()) {
			Object.assign(peep, req.body);
			await peep.save();
			return peep;
		}
	},
};

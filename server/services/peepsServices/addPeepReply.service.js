import Peep from "../../models/peep.model.js";

export const addPeepReplyService = {
	addPeepReply: async (req) => {
		const peep = await Peep.findById(req.params.id);
		if (!peep) {
			throw new Error("Peep not found");
		}
		if (peep) {
			const reply = { ...req.body, author: req.currentUser._id };
			peep.replies.push(reply);
			await peep.save();

			return peep;
		}
	},
};

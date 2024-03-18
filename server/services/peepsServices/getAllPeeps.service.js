import Peep from "../../models/peep.model.js";

export const getAllPeepsService = {
	getAllPeeps: async () => {
		const peeps = await Peep.find();
		return peeps;
	},
};

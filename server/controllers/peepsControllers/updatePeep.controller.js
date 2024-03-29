import { updatePeepService } from "../../services/peepsServices/updatePeep.service.js";

export const updatePeep = async (req, res) => {
	try {
		const peep = await updatePeepService.updatePeep(req);
		return res.status(200).json(peep);
	} catch (err) {
		if (err.kind === "ObjectId") {
			return res.status(404).json({ message: "Peep not found" });
		}
		return res.status(500).json({ message: err.message });
	}
};

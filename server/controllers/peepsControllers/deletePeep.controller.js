import { deletePeepService } from "../../services/peepsServices/deletePeep.service.js";

export const deletePeep = async (req, res) => {
	try {
		await deletePeepService.deletePeep(req);
		return res.sendStatus(204);
	} catch (err) {
		if (err.kind === "ObjectId") {
			return res.status(404).json({ message: "Peep not found" });
		}
		return res.status(500).json({ message: err.message });
	}
};

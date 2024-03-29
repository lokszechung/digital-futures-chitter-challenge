import { getSinglePeepService } from "../../services/peepsServices/getSinglePeep.service.js";

export const getSinglePeep = async (req, res) => {
	try {
		const peep = await getSinglePeepService.getSinglePeep(res, req);
		return res.status(200).json(peep);
	} catch (err) {
		if (err.kind === "ObjectId") {
			return res.status(404).json({ message: "Peep not found" });
		}
		return res.status(500).json({ message: err.message });
	}
};

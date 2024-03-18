import { getAllPeepsService } from "../../services/peepsServices/getAllPeeps.service.js";

export const getAllPeeps = async (_req, res) => {
	try {
		const peeps = await getAllPeepsService.getAllPeeps();
		return res.status(200).json(peeps);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

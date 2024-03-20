import { getSingleUserService } from "../../services/usersServices/getSingleUser.service.js";

export const getSingleUser = async (req, res) => {
	try {
		const user = await getSingleUserService.getSingleUser(req.params.id);
		return res.status(200).json(user);
	} catch (e) {
		return res.status(404).json({ message: "User not found" });
	}
};

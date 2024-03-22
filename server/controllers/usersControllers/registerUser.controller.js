import { registerUserService } from "../../services/usersServices/registerUser.service.js";

export const registerUser = async (req, res) => {
	try {
		const { user, token } = await registerUserService.registerUser(req.body);
		return res.status(201).json({ user, token });
	} catch (e) {
		if (e.code === 11000 && e.keyValue) {
			return res.status(400).json({
				message: `This ${Object.keys(e.keyValue)[0]} is already in use`,
			});
		}
		if (e.errors.passwordConfirmation) {
			return res.status(400).json({
				message: e.errors.passwordConfirmation.properties.message,
			});
		}
		return res.status(422).json({ message: e.message });
	}
};

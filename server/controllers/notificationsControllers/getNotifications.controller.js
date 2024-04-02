import { getNotificationsService } from "../../services/notificationsServices/getNotifications.service.js";

export const getNotifications = async (req, res) => {
	try {
		const notifications = await getNotificationsService.getNotifications(req);
		return res.status(200).json(notifications);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

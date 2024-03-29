import { updateNotificationService } from "../../services/notificationsServices/updateNotification.service.js";

export const updateNotification = async (req, res) => {
	try {
		const notification = await updateNotificationService.updateNotification(
			req
		);
		return res.status(200).json(notification);
	} catch (err) {
		if (err.kind === "ObjectId") {
			return res.status(404).json({ message: "Notification not found" });
		}
		return res.status(500).json({ message: err.message });
	}
};

import Notification from "../../models/notification.model.js";

export const updateNotificationService = {
	updateNotification: async (req) => {
		const notification = await Notification.findById(req.params.id);
		if (!notification) {
			throw new Error("Notification not found");
		}
		if (
			notification &&
			req.currentUser._id.toString() === notification.recipient._id.toString()
		) {
			Object.assign(notification, req.body);
			await notification.save();
			return notification;
		}
	},
};

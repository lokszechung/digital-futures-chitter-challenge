import Notification from "../../models/notification.model.js";

export const getNotificationsService = {
	getNotifications: async (req) => {
		const notifications = await Notification.find({
			recipient: req.currentUser._id,
		}).populate({
			path: "sender",
			model: "User",
		});
		return notifications;
	},
};

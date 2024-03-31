import Notification from "../../models/notification.model.js";

export const addNotificationService = {
	addNotification: async (req, peep) => {
		if (req.currentUser._id.toString() === peep.author._id.toString()) {
			return;
		}
		const notificationToAdd = await Notification.create({
			...req.body,
			sender: req.currentUser._id,
			recipient: peep.author._id,
			peep: peep._id,
		});
		return notificationToAdd;
	},
};

import sendEmail from "../../utils/sendEmail.js";
import { addPeepReplyService } from "../../services/peepsServices/addPeepReply.service.js";
import { addNotificationService } from "../../services/notificationsServices/addNotification.service.js";

export const addPeepReply = async (req, res) => {
	try {
		const peep = await addPeepReplyService.addPeepReply(req);
		const notification = await addNotificationService.addNotification(
			req,
			peep
		);
		if (notification) await sendEmail.send({ peep, notification });
		return res.status(200).json({ peep, notification });
	} catch (err) {
		if (err.kind === "ObjectId") {
			return res.status(404).json({ message: "Peep not found" });
		}
		return res.status(500).json({ message: err.message });
	}
};

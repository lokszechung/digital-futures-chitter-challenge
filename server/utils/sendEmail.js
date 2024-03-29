import nodemailer from "nodemailer";
import { getSingleUserService } from "../services/usersServices/getSingleUser.service.js";
import formatDateTime from "./formateDateTime.js";

const transporter = nodemailer.createTransport({
	service: "hotmail",
	auth: {
		user: "chitter-app@outlook.com",
		pass: "chitterapp12",
	},
});

const sendEmail = {
	send: async ({ peep, notification }) => {
		const sender = await getSingleUserService.getSingleUser(
			notification.sender
		);
		const recipient = await getSingleUserService.getSingleUser(
			notification.recipient
		);
		try {
			const info = await transporter.sendMail({
				from: `"${sender.firstname} on Chitter" <chitter-app@outlook.com>`,
				to: `${recipient.email}`,
				subject: `${sender.firstname} replied to your Peep`,
				text: `@${sender.username} replied to your Peep on Chitter:\n${notification.content}`,
				html: `<b>@${sender.username}</b> replied to your Peep on Chitter:<br>${
					notification.content
				}<br><br>at ${formatDateTime(notification.createdAt)}`,
			});

			// console.log("Email sent to: %s", info.messageId);
			console.log(info);
		} catch (error) {
			console.error(error);
		}
	},
};

export default sendEmail;

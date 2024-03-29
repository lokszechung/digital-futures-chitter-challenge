import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		recipient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		peep: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Peep",
			required: true,
		},
		content: { type: String, required: true, maxlength: 300 },
		unread: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Notification", notificationSchema);

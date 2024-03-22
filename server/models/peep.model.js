import mongoose from "mongoose";

const peepSchema = new mongoose.Schema(
	{
		content: { type: String, required: true, maxlength: 420 },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Peep", peepSchema);

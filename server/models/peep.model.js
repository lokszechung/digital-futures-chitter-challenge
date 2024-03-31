import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
	{
		content: { type: String, required: true, maxlength: 300 },
		author: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
	},
	{
		timestamps: true,
	}
);

const peepSchema = new mongoose.Schema(
	{
		content: { type: String, required: true, maxlength: 300 },
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		edited: { type: Boolean, default: false },
		replies: [replySchema],
	},
	{
		timestamps: true,
	}
);

peepSchema.pre("save", function (next) {
	if (this.isModified("content") && this.isNew) {
		this.edited = false;
	} else if (this.isModified("content")) {
		this.edited = true;
	}
	next();
});

export default mongoose.model("Peep", peepSchema);

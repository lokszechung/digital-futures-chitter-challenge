import mongoose from "mongoose";

export const connectToDb = async (URI) => {
  await mongoose.connect(URI);
}
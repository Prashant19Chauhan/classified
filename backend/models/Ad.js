import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  size: { type: String, enum: ["full", "half", "third"], required: true },
  position: { type: String, enum: ["top", "middle", "bottom"], required: true },
  duration: { type: Number, required: true }, // In weeks
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Ad", AdSchema);

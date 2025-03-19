import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  creator: {type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  size: { type: String, required: true },
  position: { type: String, required: true},
  startDate: { type: Date, required: true },
  endDate: {type: Date, required: true},
  status: { type: String, enum: ["pending", "approved", "notApproved", "Active", "Completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Ad", AdSchema);

import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  creator: {type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  reason: { type: String },
  position: { type: String, required: true},
  pageNumber: {type: String},
  layout: {type: String},
  duration: { type: String, required: true },
  links: [
    {
      label: String, // Optional title for the link
      url: String,
    },
  ],
  status: { type: String, enum: ["pending", "approved", "notApproved", "Active", "Completed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ad", AdSchema);

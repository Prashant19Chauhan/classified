import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  image: { type: String },
  layout: { type: String, required: true},
  file: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Classified", AdSchema);

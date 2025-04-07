import mongoose from "mongoose";

const DurationSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
  });

  const PageLayoutSchema = new mongoose.Schema({
    pageNumber: { type: Number, required: true },
    layout: {
      type: String,
      enum: ['full', 'half', 'quarter', 'custom'],
      required: true,
    },
  });
  
  const ClassifiedSettingSchema = new mongoose.Schema({
    durations: [DurationSchema],
    numberOfPages: { type: Number, required: true },
    pageLayouts: [PageLayoutSchema],
    status: { type: String, enum: ["Expired", "Active"], default: "Active" },
  });

export default mongoose.model("setting", ClassifiedSettingSchema);

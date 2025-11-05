// course-models/Module.js
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Module title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    contents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseContent",
      },
    ],
  },
  { timestamps: true }
);

const Module = mongoose.models.Module || mongoose.model("Module", moduleSchema);
export default Module;

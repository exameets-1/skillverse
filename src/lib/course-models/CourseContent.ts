// course-models/CourseContent.js
import mongoose from "mongoose";

const courseContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["video", "summary", "quiz", "coding"],
      required: true,
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // we won't fix the ref name here because it depends on type
    },
    order: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const CourseContent =
  mongoose.models.CourseContent ||
  mongoose.model("CourseContent", courseContentSchema);

export default CourseContent;

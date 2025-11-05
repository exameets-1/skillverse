// models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;

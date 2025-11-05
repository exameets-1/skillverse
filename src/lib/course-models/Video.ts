import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, "Video title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Video description is required"],
        trim: true,
    },
    durationSeconds: {
        type: Number,
        required: [true, "Video duration is required"],
    },
    tags: {
        type: [String],
        default: [],
    },
    videoUrl: {
        type: String,
        required: [true, "Video URL is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;

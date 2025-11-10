import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl : {
    type: String,
    required: true,
  },
  markdownText: {
    type: String,
    required: true, // store raw markdown
  },
  hook : {
    type: String,
    default: "",
  },
  author: {
    type : String,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  type : {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

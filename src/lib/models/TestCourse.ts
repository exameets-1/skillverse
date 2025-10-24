import mongoose from "mongoose";

const testCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    instructions : {
      type: [String],
      required: true
    },
    questionsPerTest: {
      type: Number,
      required: true
    },
    questions : [{
    //we refer to question documents
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    }],
    durationMinutes: {
      type: Number,
      required: true
    },
    totalMarks : {
      type: Number,
      required: true        
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const TestCourse = mongoose.models.TestCourse || mongoose.model("TestCourse", testCourseSchema);

export default TestCourse;

import mongoose from "mongoose";

// ─────────────────────────────
// Sub-schema for options
// ─────────────────────────────
const optionSchema = new mongoose.Schema({
  optionText: {
    type: String,
    required: [true, "Option text is required"],
    trim: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
});

// ─────────────────────────────
// Main schema
// ─────────────────────────────
const quizQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, "Question text is required"],
    trim: true,
  },

  // Options will exist for all types (even if empty for input/code)
  options: {
    type: [optionSchema],
    default: [],
  },

  questionType: {
    type: String,
    enum: ["radio", "checkbox", "true_false", "input", "code"],
    required: [true, "Question type is required"],
  },

  imageUrl: {
    type: String,
    default: null,
  },

  marks: {
    type: Number,
    required: [true, "Marks are required"],
    min: [1, "Marks must be at least 1"],
  },

  difficultyLevel: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },

  correctAnswers: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Correct answers are required"],
  },

  tags: {
    type: [String],
    default: [],
  },

  explanation: {
    type: String,
    default: null,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ─────────────────────────────
// Validation Hook (Consistency Check)
// ─────────────────────────────
// quizQuestionSchema.pre("validate", function (next) {

//   // Ensure options are present where necessary
//   if (["radio", "checkbox", "true_false"].includes(this.questionType)) {
//     if (!this.options || this.options.length === 0) {
//       return next(
//         new Error(`${this.questionType} questions must include at least one option.`)
//       );
//     }
//   }

//   // Auto-fill true_false options if missing
//   if (this.questionType === "true_false" && this.options.length === 0) {
//     this.options = [{ optionText: "True" }, { optionText: "False" }];
//   }

//   // Validate correctAnswers shape
//   if (this.questionType === "radio" && typeof this.correctAnswers !== "number") {
//     return next(new Error("Radio questions must have a numeric correctAnswers index."));
//   }

//   if (this.questionType === "checkbox" && !Array.isArray(this.correctAnswers)) {
//     return next(new Error("Checkbox questions must have an array of correct option indices."));
//   }

//   if (this.questionType === "true_false" && typeof this.correctAnswers !== "boolean") {
//     return next(new Error("True/False questions must have a boolean correctAnswers value."));
//   }

//   if (this.questionType === "input" && !Array.isArray(this.correctAnswers)) {
//     return next(new Error("Input questions must have an array of acceptable answer strings."));
//   }

//   if (q.questionType === "code" && typeof q.correctAnswers !== "object") {
//     return next(new Error("Code questions must have an object defining expected outputs/test cases."));
//   }

//   next();
// });

// ─────────────────────────────
// Indexes for faster queries
// ─────────────────────────────
quizQuestionSchema.index({ tags: 1 });
quizQuestionSchema.index({ questionType: 1 });
quizQuestionSchema.index({ difficultyLevel: 1 });

// ─────────────────────────────
// Model Export
// ─────────────────────────────
const QuizQuestion =
  mongoose.models.QuizQuestion ||
  mongoose.model("QuizQuestion", quizQuestionSchema);

export default QuizQuestion;

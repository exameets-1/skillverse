// import mongoose from "mongoose";

// const testAttemptSchema = new mongoose.Schema(
//   {
//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Student",
//       required: true,
//     },

//     testCourse: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "TestCourse",
//       required: true,
//     },

//     // stores all answer selections in real time
//     answerAttempts: [
//       {
//         question: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Question",
//           required: true,
//         },
//         optionSelected: {
//           type: Number, // index of the selected option (0–3)
//           required: true,
//         },
//       },
//     ],

//     // set when test starts
//     startTime: {
//       type: Date,
//       default: Date.now,
//     },

//     // set when creating test attempt: startTime + duration
//     endTime: {
//       type: Date,
//       required: true,
//     },

//     // current test state
//     status: {
//       type: String,
//       enum: ["in_progress", "submitted", "auto_submitted"],
//       default: "in_progress",
//     },

//     // optional: to track how many minutes left (useful if you want to display safely)
//     timeRemaining: {
//       type: Number, // in seconds
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // ensure a student can attempt a specific test only once
// testAttemptSchema.index({ student: 1, testCourse: 1 }, { unique: true });

// const TestAttempt = mongoose.models.TestAttempt || mongoose.model("TestAttempt", testAttemptSchema);

// export default TestAttempt;



import mongoose from "mongoose";

const testAttemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    testCourse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestCourse",
      required: true,
    },

    answerAttempts: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        optionSelected: {
          type: Number, // index of the selected option (0–3)
          default: null, // null means unanswered
        },
        timeSpent: {
          type: Number, // in seconds
          default: 0
        },
        lastInteractionAt: {
          type: Date,
          default: Date.now
        }
      },
    ],

    startTime: {
      type: Date,
      default: Date.now,
    },

    endTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["in_progress", "submitted", "auto_submitted"],
      default: "in_progress",
    },

    timeRemaining: {
      type: Number, // in seconds
    },
  },
  {
    timestamps: true,
  }
);

testAttemptSchema.index({ student: 1, testCourse: 1 }, { unique: true });

const TestAttempt = mongoose.models.TestAttempt || mongoose.model("TestAttempt", testAttemptSchema);

export default TestAttempt;
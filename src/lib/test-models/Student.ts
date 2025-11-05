import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    studentNumber : {
        type: String,
        required: true,
    },
    studentDOB: {
        type: Date,
        required: true
    },
    studentGuardianName : {
        type: String,
        required: true,
    },
    studentGuardianNumber : {
        type: String,
        required: true
    },
    location: {
        state: { type: String, required: true },
        district: { type: String, required: true }
    },
    registeredCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestCourse"
    }],
    referralCode: {
        type: String,
    },
    referredBy: {
        //we refer to other student documents
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
  },
  {
    timestamps: true
  }
);

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;

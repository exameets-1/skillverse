import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuizQuestion",
        required: true
    }],
    questionsPerQuiz: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    passMarks : {
        type: Number,
        required: true
    },
    durationSeconds: {
        type: Number,
        required: true
    },
    instructions: {
        type: [String],
        required: true  
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;
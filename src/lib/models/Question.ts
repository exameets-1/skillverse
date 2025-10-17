import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText : {
        type: String,
        required: true
    },
    options: [{
        text: {
            type: String,
            required: true
        },
    }],
    correctOptionIndex: {
        type: Number,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
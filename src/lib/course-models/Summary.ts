import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
    markdownText: {
        type: String,
        required: true
    },
    lastEdited : {
        type: Date,
        default: Date.now
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Summary = mongoose.models.Summary || mongoose.model("Summary", summarySchema);

export default Summary;
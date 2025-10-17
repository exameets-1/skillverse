import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
        unique: true
    },
    referralCode : {
        type: String,
        required: true,
        unique: true
    },
    referredUsers : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }],
    count : {
        type: Number,
        default: 0
    },
    lastUsed : {
        type: Date,
        default: null
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
});

const Referral = mongoose.models.Referral || mongoose.model("Referral", referralSchema);

export default Referral;

import mongoose from "mongoose";
// Import Student model but don't use it directly to avoid circular dependencies
import './Student';

// Add interface for type safety
interface IReferral {
  owner: mongoose.Types.ObjectId;
  referralCode: string;
  referredUsers: mongoose.Types.ObjectId[];
  count: number;
  lastUsed: Date | null;
  createdAt: Date;
}

const referralSchema = new mongoose.Schema<IReferral>({
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

// Use type assertion to handle model registration
const Referral = (mongoose.models.Referral as mongoose.Model<IReferral>) || 
  mongoose.model<IReferral>("Referral", referralSchema);

export default Referral;

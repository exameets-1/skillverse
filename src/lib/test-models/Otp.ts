import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { 
        type: String, 
        required: true 
    },
    otp: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    attempts : {
        type: Number,
        default: 0
    },
    verified : { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 300
    },
  }
);

const Otp = mongoose.models.Otp || mongoose.model("Otp", otpSchema);

export default Otp;

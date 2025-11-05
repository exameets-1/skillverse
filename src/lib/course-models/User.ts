import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    location: {
      state: {
        type: String,
        required: false,
      },
      district: {
        type: String,
        required: false,
      },
    },
    guardianName: {
      type: String,
      required: false,
    },
    guardianPhone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role : {
        enum: ["student", "admin", "instructor","employee"],
        type: String,
        default: "student"
    }
  },
  { timestamps: true }
);

//Pre save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if changed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPwd: string) {
  return bcrypt.compare(enteredPwd, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["candidate", "recruiter"], default: "candidate" },
    skills: [{ type: String, trim: true }],
    bio: { type: String, default: "", maxlength: 500 }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

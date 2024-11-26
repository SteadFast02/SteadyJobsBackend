import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required...!"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      validate: [validator.isEmail, "invalid email, Enter Valid email...!"],
    },
    coverLetter: {
      type: String,
      required: [true, "cover letter is requrired...!"],
    },
    phone: {
      type: String,
      required: [true, "Please provide phone number..!"],
    },
    address: {
      type: String,
      required: [true, "Address is required...!"],
    },
    resume: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    applicantID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["Job Seeker"],
        required: true,
      },
    },
    employerID: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["Employer"],
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);

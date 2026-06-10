const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 6 },

    role: {
  type: String,
  enum: ["student", "instructor", "admin", "superadmin"],
  default: "student",
},
    subscription: {
      plan: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan" },
      startDate: Date,
      endDate: Date,
      isActive: { type: Boolean, default: false },
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);

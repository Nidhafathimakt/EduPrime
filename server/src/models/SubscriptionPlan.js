const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      enum: ["monthly", "quarterly", "yearly"],
      required: true,
      unique: true,
    },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    durationUnit: {
      type: String,
      enum: ["days", "months"],
      default: "months",
    },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);

const User = require("../models/User");
const SubscriptionPlan = require("../models/SubscriptionPlan");

const createPlan = async (req, res) => {
  try {
    const { name, slug, price, duration, durationUnit, features } = req.body;

    // Check if plan already exists
    const existingPlan = await SubscriptionPlan.findOne({ slug });

    if (existingPlan) {
      return res.status(400).json({
        success: false,
        message: "Subscription plan already exists",
      });
    }

    const plan = await SubscriptionPlan.create({
      name,
      slug,
      price,
      duration,
      durationUnit,
      features,
    });

    res.status(201).json({
      success: true,
      message: "Subscription plan created successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const subscribePlan = async (req, res) => {
  try {
    const userId = req.userId;
    const planId = req.params.planId;

    const plan = await SubscriptionPlan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    const user = await User.findById(userId);

    // attach subscription (simple version)
    user.subscription = {
      plan: planId,
      startDate: new Date(),
      status: "active",
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
      data: user.subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
      message: "Plans fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  createPlan,
  getPlans,
  subscribePlan,
};

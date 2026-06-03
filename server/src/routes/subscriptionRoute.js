const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createPlan,
  getPlans,
  subscribePlan,
} = require("../controllers/subscriptionController");

const router = express.Router();
router.post("/", authMiddleware, createPlan);
router.get("/", getPlans);
router.post("/subscribe/:planId", authMiddleware, subscribePlan);

module.exports = router;

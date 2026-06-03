const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getMyProgress,
  updateProgress,
} = require("../controllers/progressController");

router.get("/my-progress", authMiddleware, getMyProgress);

router.post("/update", authMiddleware, updateProgress);

module.exports = router;

const express = require("express");

const {
  getUser,
  updateUser,
  deleteUser,
  getDashboardStats,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/stats", getDashboardStats);

module.exports = router;

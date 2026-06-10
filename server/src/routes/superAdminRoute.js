const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { superAdminMiddleware } = require("../middleware/superAdminMiddleware")
const {
  createAdmin
} = require("../controllers/superAdminController");
const router = express.Router();

router.post(
  "/create-admin",
  authMiddleware,
  superAdminMiddleware,
  createAdmin
);


module.exports = router;
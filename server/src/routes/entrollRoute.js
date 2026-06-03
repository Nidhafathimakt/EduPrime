const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getMyEnrolledCourses,
  entrollCourse,
  checkEnrollment,
} = require("../controllers/entrolledController");

router.post("/enroll/:id", authMiddleware, entrollCourse);

router.get("/my-enrolled-courses", authMiddleware, getMyEnrolledCourses);

router.get("/check-enrollment/:id", authMiddleware, checkEnrollment);

module.exports = router;

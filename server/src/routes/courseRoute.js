const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createCourse,
  getCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  uploadThumbnail,
  approveCourse,
  rejectCourse,
  getMyCourses,
  getInstructorCourses,
} = require("../controllers/courseController");

const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, upload.single("thumbnail"), createCourse);

router.get("/", getCourse);

router.get("/my-courses", authMiddleware, getMyCourses);
router.get("/:id", getCourseById);

router.put("/:id", authMiddleware, upload.single("thumbnail"), updateCourse);

router.delete("/:id", authMiddleware, deleteCourse);

router.put(
  "/course/:id/thumbnail",
  upload.single("thumbnail"),
  uploadThumbnail,
);


router.put("/:id/approve", authMiddleware, approveCourse);

router.put("/:id/reject", authMiddleware, rejectCourse);

router.get("/instructor/my-courses", authMiddleware, getInstructorCourses);

module.exports = router;

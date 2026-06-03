const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
  verifyCourseAccess,
} = require("../controllers/lessonController");

const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createLesson);

router.get("/course/:courseId", getLessonsByCourse);

router.get("/:id", getLessonById);

router.put("/:id", authMiddleware, updateLesson);

router.delete("/:id", authMiddleware, deleteLesson);

router.get("/verify-access/:lessonId", authMiddleware, verifyCourseAccess);

module.exports = router;

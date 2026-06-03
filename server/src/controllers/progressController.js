const Progress = require("../models/Progress");
const Course = require("../models/Course");

const Lesson = require("../models/Lesson");
const updateProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId, lessonId } = req.body;

    if (!userId || !courseId || !lessonId) {
      return res.status(400).json({
        success: false,
        message: "Missing data",
      });
    }

    let progress = await Progress.findOne({
      userId,
      courseId,
    });

    if (!progress) {
      progress = new Progress({
        userId,
        courseId,
        completedLessons: [],
        progressPercentage: 0,
      });
    }

    // prevent duplicates
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    const totalLessons = await Lesson.countDocuments({ courseId });

    const completed = progress.completedLessons.length;

    progress.progressPercentage =
      totalLessons === 0 ? 0 : Math.round((completed / totalLessons) * 100);

    if (progress.progressPercentage === 100) {
      progress.certificateIssued = true;
    }

    await progress.save();

    res.json({
      success: true,
      data: progress,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET progress for logged-in user
const getMyProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId }).populate(
      "courseId",
      "title thumbnail",
    );

    res.json({
      success: true,
      data: progress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getMyProgress,
  updateProgress,
};

const Course = require("../models/Course");
const User = require("../models/User");

const entrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const user = await User.findById(req.userId);

    const alreadyEnrolled = course.enrolledStudents.some(
      (student) => student.toString() === req.userId,
    );

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    course.enrolledStudents.push(req.userId);
    user.enrolledCourses.push(course._id);

    await course.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Enrolled successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: "enrolledCourses",
      populate: {
        path: "instructor",
        select: "name email",
      },
    });

    res.status(200).json({
      success: true,
      count: user.enrolledCourses.length,
      data: user.enrolledCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkEnrollment = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const enrolled = course.enrolledStudents.some(
      (student) => student.toString() === req.userId,
    );

    res.status(200).json({
      success: true,
      enrolled,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyEnrolledCourses,
  checkEnrollment,
  entrollCourse,
};

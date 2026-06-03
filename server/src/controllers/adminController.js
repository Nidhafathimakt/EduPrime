const User = require("../models/User");
const Course = require("../models/Course");

const getUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server errror",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCourses = await Course.countDocuments();

    const approvedCourses = await Course.countDocuments({
      status: "approved",
    });

    const pendingCourses = await Course.countDocuments({
      status: "pending",
    });

    const activeSubscriptions = await User.countDocuments({
      "subscription.isActive": true,
    });

    const courses = await Course.find();

    const totalEnrollments = courses.reduce(
      (total, course) => total + (course.enrolledStudents?.length || 0),
      0,
    );

    const estimatedRevenue = activeSubscriptions * 19.99;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCourses,
        approvedCourses,
        pendingCourses,
        activeSubscriptions,
        totalEnrollments,
        estimatedRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  getDashboardStats,
};

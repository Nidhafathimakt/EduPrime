const Course = require("../models/Course");
const User = require("../models/User");
const { uploadToCloudinary } = require("../middleware/upload");
// const createCourse = async (req, res) => {

//   try {
   

//     const { title, description, category, level, price } = req.body;
//     const result = req.file
//   ? await uploadToCloudinary(req.file.buffer)
//   : null;

//     if (!title || !description || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "Title, description, category are required",
//       });
//     }

//     const course = await Course.create({
//       title,
//       description,
//       category,
//       level,
//       price,
//       thumbnail: req.file ? req.file.path : "",
//       instructor: req.userId,
//     });

//     res.status(201).json({
//       success: true,
//       data: course,
//     });
//   // } catch (error) {
//   //   res.status(500).json({
//   //     success: false,
//   //     message: error.message,
//   //   });
//   }
//   catch (error) {
//   console.log("CREATE COURSE ERROR:", error);

//   res.status(500).json({
//     success: false,
//     message: error.message,
//     stack: error.stack,
//   });
// }
// };

const createCourse = async (req, res) => {
  try {
    const { title, description, category, level, price } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description, category are required",
      });
    }

    let thumbnailUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      thumbnailUrl = result.secure_url;
    }

    const course = await Course.create({
      title,
      description,
      category,
      level,
      price,
      thumbnail: thumbnailUrl,
      instructor: req.userId,
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log("CREATE COURSE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
      message: "Course fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    console.log("Course ID:", req.params.id);

    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email",
    );

    console.log("Course Found:", course);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.instructor.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const approveCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.status = "approved";

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course approved",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const uploadThumbnail = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.thumbnail = req.file.path;

    await course.save();

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const rejectCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.status = "rejected";

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course rejected",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyCourses = async (req, res) => {
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
      data: user.enrolledCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.userId,
    })
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
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
};

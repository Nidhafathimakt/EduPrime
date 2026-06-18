const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { MongoExpiredSessionError } = require("mongodb");

let register = async (req, res) => {

 
  const { name, email, password, role } = req.body;

 console.log(req.body);
console.log("Role:", role);

   const allowedRoles = ["student", "instructor"];

if (!allowedRoles.includes(role)) {
  return res.status(400).json({
    success: false,
    message: "Invalid role",
  });
}
  const userExist = await User.findOne({ email });
  if (userExist)
    return res.status(400).json({
      message: "User exists",
    });
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword});
  res.status(201).json({
    message: "Registered Successfully",
  });
};

let login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login", req.body)

  const user = await User.findOne({ email});
  if (!user)
    return res.status(400).json({
      message: "Invalid Email",
    });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      message: "Invalid password",
    });

     console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("========== ENV ==========");
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("MONGO_URI =", !!process.env.MONGO_URI);
console.log("=========================");


  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
 
  res.status(200).json({
    success: true,
    token,
    user: user,
    message: "Login successfull",
  });
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const { name, email, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, bio },
      { new: true },
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userId;

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Current password is wrong",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  updateProfile,
  changePassword,
};

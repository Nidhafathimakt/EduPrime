const bcrypt = require("bcrypt");
const User = require("../models/User");

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });

  res.json({
    success: true,
    data: admin,
  });
};


module.exports ={
    createAdmin
}
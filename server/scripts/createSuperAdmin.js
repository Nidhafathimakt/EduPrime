const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../src/models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const createSuperAdmin = async () => {
  try {
    const existing = await User.findOne({
      email: "superadmin@eduprime.com",
    });

    if (existing) {
      console.log("Super Admin already exists");
      process.exit();
    }

    const password = await bcrypt.hash("super123", 10);

    await User.create({
      name: "Super Admin",
      email: "superadmin@eduprime.com",
      password,
      role: "superadmin",
    });

    console.log("Super Admin Created");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

createSuperAdmin();
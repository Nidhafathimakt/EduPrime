const User = require("../models/User");
const superAdminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.userId);

//   if (user.role !== "superadmin")
    if (!user || user.role !== "superadmin")  {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  next();
};

module.exports = {
  superAdminMiddleware,
};
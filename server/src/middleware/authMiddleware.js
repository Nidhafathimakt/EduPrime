const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      return res.status(401).json({
        message: "UnAuthorized",
      });

    const tokenValid = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenValid.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are UnAthorized",
    });
  }
};

module.exports = {
  authMiddleware,
};

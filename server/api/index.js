const { app, connectDB } = require("../server");

connectDB();

module.exports = app;
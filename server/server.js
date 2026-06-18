// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRoute = require("./src/routes/authRoute");
// const courseRoute = require("./src/routes/courseRoute");
// const subscriptonRoute = require("./src/routes/subscriptionRoute");
// const adminRoute = require("./src/routes/adminRoute");
// const lessonRoute = require("./src/routes/lessonRoute");
// const entrollRoute = require("./src/routes/entrollRoute");
// const progressRoute = require("./src/routes/progressRoute");
// const superAdminRoute = require("./src/routes/superAdminRoute")

// require("dotenv").config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/user", authRoute);
// app.use("/api/course", courseRoute);
// app.use("/api/subscription", subscriptonRoute);
// app.use("/api/admin", adminRoute);
// app.use("/api/lesson", lessonRoute);
// app.use("/api/entroll", entrollRoute);
// app.use("/api/progress", progressRoute);
// app.use("/api/super-admin", superAdminRoute)
// app.use("/uploads", express.static("uploads"));

// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`),
// );

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoute = require("./src/routes/authRoute");
const courseRoute = require("./src/routes/courseRoute");
const subscriptionRoute = require("./src/routes/subscriptionRoute");
const adminRoute = require("./src/routes/adminRoute");
const lessonRoute = require("./src/routes/lessonRoute");
const entrollRoute = require("./src/routes/entrollRoute");
const progressRoute = require("./src/routes/progressRoute");
const superAdminRoute = require("./src/routes/superAdminRoute");

const app = express();

// Middleware
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://edu-prime-five.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/user", authRoute);
app.use("/api/course", courseRoute);
app.use("/api/subscription", subscriptionRoute);
app.use("/api/admin", adminRoute);
app.use("/api/lesson", lessonRoute);
app.use("/api/entroll", entrollRoute);
app.use("/api/progress", progressRoute);
app.use("/api/super-admin", superAdminRoute);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

module.exports = app;
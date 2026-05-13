const express = require("express");
const path = require("path");
const connectDB = require("./config/connectDB");
const { router } = require("./routes/url");
const { staticRoute } = require("./routes/staticRouter");
const { userRouter } = require("./routes/user");
const { handelRedirectToURL } = require("./controllers/url");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const { authMiddleware } = require("./middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

app.set("view engine", "ejs"); // Set the views directory for EJS templates / ejs is in simple words like its html and with some js code in it like php
app.set("views", path.resolve("./views")); // Set the views directory for EJS templates
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Middleware to parse cookies from incoming requests

app.use("/", staticRoute);
app.use("/url", authMiddleware, router);
app.use("/user", userRouter); // For user registration and login
app.get("/:shortId", handelRedirectToURL);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

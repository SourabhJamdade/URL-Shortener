const express = require("express");
const URL = require("../models/url");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/analytics", authMiddleware, async (req, res) => {
  const allURLs = await URL.find({
    createdBy: req.user._id, // Fetch URLs created by the authenticated user
  });
  return res.render("analytics", { urls: allURLs });
});

router.get("/", async (req, res) => {
  return res.render("home");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = { staticRoute: router };

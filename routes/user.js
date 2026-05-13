const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { handleRegisterUser, handleLoginUser } = require("../controllers/user");

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);

module.exports = { userRouter: router };

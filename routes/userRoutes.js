const express = require("express");

const router = express.Router();

const { login, signUp } = require("./../controller/authController");

router.route("/login").post(login);
router.route("/signup").post(signUp);

module.exports = router;

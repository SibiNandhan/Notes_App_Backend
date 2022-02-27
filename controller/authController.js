const User = require("./../models/UserModel");
const sendJwt = require("./../factoryFunction/jwtFunction");
const bcryptCompare = require("./../factoryFunction/bcryptCompare");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  try {
    const { email, name, password, pic } = req.body;
    if (!email || !name || !password) {
      throw new Error("Enter all the Fields");
    }

    const CheckEmail = await User.findOne({ email: email });
    if (CheckEmail) {
      throw new Error("Email Already Exist");
    }

    const user = await User.create({
      email: email,
      password: password,
      name: name,
    });
    res.json({
      status: "success",
      email: user.email,
      name: user.name,
      id: user._id,
      token: sendJwt(user._id),
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Enter email and password");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User Not Found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect Email or Password");
    }
    res.status(200).json({
      status: "success",
      email: user.email,
      name: user.name,
      id: user._id,
      token: sendJwt(user._id),
    });
  } catch (err) {
    next(err);
  }
};

const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      next(err);
    }
  } else {
    res.status(400).json({
      status: "failure",
      error: "No Token",
    });
  }
};

module.exports = { signUp, login, protect };

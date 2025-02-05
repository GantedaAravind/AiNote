"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../../models/user"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const signupController = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }
    const existingUser = await _user.default.findOne({
      email
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use."
      });
    }
    const hashedPassword = await _bcryptjs.default.hash(password, 10);
    const newUser = new _user.default({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    const token = _jsonwebtoken.default.sign({
      userId: newUser._id
    }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(201).cookie("auth_token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }).json({
      message: "User registered successfully",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
var _default = exports.default = signupController;
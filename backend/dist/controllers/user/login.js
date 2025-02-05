"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../../models/user.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const loginController = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }
    const user = await _user.default.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password."
      });
    }
    const isMatch = await _bcryptjs.default.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password."
      });
    }
    const token = _jsonwebtoken.default.sign({
      userId: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(200).cookie("auth_token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }).json({
      message: "Login successful",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
var _default = exports.default = loginController;
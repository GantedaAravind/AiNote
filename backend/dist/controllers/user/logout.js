"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const logoutController = async (req, res) => {
  try {
    res.status(200).clearCookie("auth_token").json({
      message: "Logout successful"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
var _default = exports.default = logoutController;
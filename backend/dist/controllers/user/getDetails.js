"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _user = _interopRequireDefault(require("../../models/user.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getUserDetails = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
var _default = exports.default = getUserDetails;
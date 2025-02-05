"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const authMiddleware = async (req, res, next) => {
  try {
    var _req$headers$authoriz;
    // Get token from the authorization header
    const token = req.cookies.auth_token || ((_req$headers$authoriz = req.headers["authorization"]) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(" ")[1]);
    if (!token) {
      return res.status(401).json({
        message: "No token provided, authorization denied."
      });
    }

    // Verify the token using the JWT secret
    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

    // Find the user using the decoded userId from the token
    const user = await _user.default.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    // Attach user information to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: error.message
    });
  }
};
var _default = exports.default = authMiddleware;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _singnup = _interopRequireDefault(require("../controllers/user/singnup"));
var _login = _interopRequireDefault(require("../controllers/user/login"));
var _logout = _interopRequireDefault(require("../controllers/user/logout"));
var _auth = _interopRequireDefault(require("../middlewares/auth.middleware"));
var _getDetails = _interopRequireDefault(require("../controllers/user/getDetails"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userRouter = _express["default"].Router();
userRouter.post("/signup", _singnup["default"]);
userRouter.post("/login", _login["default"]);
userRouter.post("/logout", _logout["default"]);
userRouter.get("/me", _auth["default"], _getDetails["default"]); // Protected Route
var _default = exports["default"] = userRouter;
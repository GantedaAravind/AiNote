"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireWildcard(require("express"));
var _db = _interopRequireDefault(require("./config/db.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _user = _interopRequireDefault(require("./routes/user.js"));
var _note = _interopRequireDefault(require("./routes/note.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
_dotenv["default"].config();
app.use((0, _express.json)());
app.use((0, _cookieParser["default"])());
app.use("/user", _user["default"]);
app.use("/note", _note["default"]);
var PORT = process.env.PORT || 7777;
(0, _db["default"])().then(function () {
  app.listen(PORT, function () {
    console.log("Server started at port ".concat(PORT));
  });
})["catch"](function (error) {
  console.error("MongoDB Connection Failed:", error);
});
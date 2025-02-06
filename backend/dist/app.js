"use strict";

var _express = _interopRequireWildcard(require("express"));
var _db = _interopRequireDefault(require("./config/db.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _user = _interopRequireDefault(require("./routes/user.js"));
var _note = _interopRequireDefault(require("./routes/note.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const app = (0, _express.default)();
const corsOptions = {
  origin: ["https://ainote24.web.app"],
  // The frontend URL you want to allow (replace with the actual URL)
  credentials: true // Allow sending credentials (cookies, HTTP authentication)
};
app.use((0, _cors.default)(corsOptions));
_dotenv.default.config();
app.use((0, _express.json)());
app.use((0, _cookieParser.default)());
app.use("/user", _user.default);
app.use("/note", _note.default);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Note-Taking API! 🚀"
  });
});
const PORT = process.env.PORT || 7777;
(0, _db.default)().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}).catch(error => {
  console.error("MongoDB Connection Failed:", error);
});
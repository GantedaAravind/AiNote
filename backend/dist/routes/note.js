"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = _interopRequireDefault(require("../middlewares/auth.middleware.js"));
var _createNote = _interopRequireDefault(require("../controllers/note/createNote.js"));
var _updateNote = _interopRequireDefault(require("../controllers/note/updateNote.js"));
var _deleteNote = _interopRequireDefault(require("../controllers/note/deleteNote.js"));
var _getNotes = _interopRequireDefault(require("../controllers/note/getNotes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var noteRouter = _express["default"].Router();
noteRouter.post("/createnotes", _authMiddleware["default"], _createNote["default"]); // Protect the route with authMiddleware
noteRouter.put("/updatenotes/:noteId", _authMiddleware["default"], _updateNote["default"]);
noteRouter["delete"]("/deletenotes/:noteId", _authMiddleware["default"], _deleteNote["default"]);
noteRouter.get("/", _authMiddleware["default"], _getNotes["default"]);
var _default = exports["default"] = noteRouter;
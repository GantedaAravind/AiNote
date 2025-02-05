"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _note = _interopRequireDefault(require("../../models/note.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Get All Notes Controller
 * @param {Request} req
 * @param {Response} res
 */
const getAllNotesController = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID from authMiddleware
    // Fetch all notes belonging to the logged-in user
    const notes = await _note.default.find({
      userId
    }).sort({
      createdAt: -1
    });
    res.status(200).json({
      notes
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
var _default = exports.default = getAllNotesController;
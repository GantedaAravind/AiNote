"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _note = _interopRequireDefault(require("../../models/note.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Delete Note Controller
 * @param {Request} req
 * @param {Response} res
 */
const deleteNoteController = async (req, res) => {
  try {
    const {
      noteId
    } = req.params;

    // Find the note by ID and ensure it belongs to the logged-in user
    const note = await _note.default.findOne({
      _id: noteId,
      userId: req.user.id
    });
    if (!note) {
      return res.status(404).json({
        message: "Note not found or unauthorized"
      });
    }
    await _note.default.deleteOne({
      _id: noteId
    });
    res.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
var _default = exports.default = deleteNoteController;
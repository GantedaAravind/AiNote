"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NoteSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    trim: true // Removes unnecessary spaces
  },
  content: {
    type: String,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false // Default: note is not favorited
  },
  imageUrls: {
    type: [String],
    // Array of strings to store multiple image URLs
    default: [] // Default to an empty array if no images are uploaded
  },
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User",
    // Reference to the User model
    required: true // Ensure each note has an owner
  }
}, {
  timestamps: true
} // Automatically adds `createdAt` and `updatedAt`
);
const noteModel = _mongoose.default.model("Note", NoteSchema);
var _default = exports.default = noteModel;
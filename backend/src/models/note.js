import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary spaces
    },
    content: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false, // Default: note is not favorited
    },
    imageUrls: {
      type: [String], // Array of strings to store multiple image URLs
      default: [], // Default to an empty array if no images are uploaded
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Ensure each note has an owner
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const noteModel = mongoose.model("Note", NoteSchema);
export default noteModel;

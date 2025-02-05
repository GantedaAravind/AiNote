import noteModel from "../../models/note.js";

/**
 * Delete Note Controller
 * @param {Request} req
 * @param {Response} res
 */
const deleteNoteController = async (req, res) => {
  try {
    const { noteId } = req.params;

    // Find the note by ID and ensure it belongs to the logged-in user
    const note = await noteModel.findOne({ _id: noteId, userId: req.user.id });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    await noteModel.deleteOne({ _id: noteId });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default deleteNoteController;

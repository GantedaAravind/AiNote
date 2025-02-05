import noteModel from "../../models/note.js";

/**
 * Update Note Controller
 * @param {Request} req
 * @param {Response} res
 */
const updateNoteController = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, isFavorite, imageUrls } = req.body;

    // Find the note by ID and ensure it belongs to the logged-in user
    const note = await noteModel.findOne({ _id: noteId, userId: req.user.id });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    // Update the note fields if provided
    if (title) note.title = title;
    if (content) note.content = content;
    if (isFavorite !== undefined) note.isFavorite = isFavorite;
    if (imageUrls) note.imageUrls = imageUrls;

    await note.save(); // Save the updated note

    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default updateNoteController;

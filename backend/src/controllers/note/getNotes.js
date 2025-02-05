import noteModel from "../../models/note.js";

/**
 * Get All Notes Controller
 * @param {Request} req
 * @param {Response} res
 */
const getAllNotesController = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user ID from authMiddleware
    // Fetch all notes belonging to the logged-in user
    const notes = await noteModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default getAllNotesController;

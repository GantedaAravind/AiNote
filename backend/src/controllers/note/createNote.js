import noteModel from "../../models/note";

const createNoteController = async (req, res) => {
  try {
    const { title, content, isFavorite, imageUrls } = req.body;

    // Ensure all required fields are provided
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    // Access the authenticated user from req.user (set by the authMiddleware)
    const user = req.user;

    // Create a new note, associating it with the authenticated user
    const newNote = new noteModel({
      title,
      content,
      isFavorite: isFavorite || false, // Default to false if not provided
      imageUrls: imageUrls || [], // Default to an empty array if no image URLs are provided
      userId: user._id, // Associate the note with the user's ID
    });

    // Save the note to the database
    await newNote.save();

    // Return a success response
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    // Handle errors (e.g., database issues, invalid input)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default createNoteController;

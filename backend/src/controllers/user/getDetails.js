import userModel from "../../models/user.js";

const getUserDetails = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default getUserDetails;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../models/user.js";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("auth_token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "Login successful", data: user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default loginController;

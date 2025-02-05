import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../models/user";

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(201)
      .cookie("auth_token", token, {
        httpOnly: true, // ✅ Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // ✅ Only use secure in production
        sameSite: "None", // ✅ Required for cross-origin requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 days expiry
      })
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default signupController;

const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("auth_token", {
        httpOnly: true, // ✅ Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // ✅ Only use secure in production
        sameSite: "None", // ✅ Required for cross-origin requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 days expiry
      })
      .json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export default logoutController;

import express, { json } from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import noteRouter from "./routes/note.js";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

app.use(json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Note-Taking API! 🚀" });
});

const PORT = process.env.PORT || 7777;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error);
  });

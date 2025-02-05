import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import createNoteController from "../controllers/note/createNote.js";
import updateNoteController from "../controllers/note/updateNote.js";
import deleteNoteController from "../controllers/note/deleteNote.js";
import getAllNotesController from "../controllers/note/getNotes.js";

const noteRouter = express.Router();

noteRouter.post("/createnotes", authMiddleware, createNoteController); // Protect the route with authMiddleware
noteRouter.put("/updatenotes/:noteId", authMiddleware, updateNoteController);
noteRouter.delete("/deletenotes/:noteId", authMiddleware, deleteNoteController);
noteRouter.get("/", authMiddleware, getAllNotesController);
export default noteRouter;

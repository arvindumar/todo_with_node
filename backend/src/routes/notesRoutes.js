import express from "express";

const router = express.Router();
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getNoteById,
} from "../controllers/notesController.js";

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

// app.get("/api/notes", (req, res) => {
//   res.status(200).send("You got 20 notes");
// });

// app.post("/api/notes", (req, res) => {
//   res.status(201).send("Note created Successfully!");
// });

// app.put("/api/notes/:id", (req, res) => {
//   res.status(200).send("Note Updated Successfully!");
// });

// app.delete("/api/notes/:id", (req, res) => {
//   res.status(200).send("Note Deleted Successfully!");
// });

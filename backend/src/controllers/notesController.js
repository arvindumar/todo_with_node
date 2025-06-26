import Note from "../models/Note.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //newest first desc order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes", error);
    res.status(500).json({ message: "Internal server error in get" });
  }
};
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "this note is not found🙂" });
    }
    res.status(200).json({ message: "Content updated successfully!💛" });
  } catch (error) {
    console.error("Error in updateNote", error);
    res.status(500).json({ message: "Internal server error in put" });
  }
};
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    const newNote = new Note({ title: title, content: content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully!💚" });
  } catch (error) {
    console.error("Error in createNote", error);
    res.status(500).json({ message: "Internal server error in post" });
  }
};
const deleteNote = async (req, res) => {
  try {
    const todeletenote = await Note.findByIdAndDelete(req.params.id);
    if (!todeletenote)
      return res.status(404).json({ message: "Note not found🙂" });
    res.status(200).json({ message: "Note deleted Successfully!❤️" });
  } catch (error) {
    console.error("Error in deleteNote", error);
    res.status(500).json({ message: "Internal server error in delete" });
  }
};
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found😒" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById", error);
    res.status(500).json({ message: "Internal server error in getNoteById" });
  }
};

export { getAllNotes, updateNote, createNote, deleteNote, getNoteById };

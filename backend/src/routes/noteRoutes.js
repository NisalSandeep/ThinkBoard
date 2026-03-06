const express = require("express");
const {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} = require("../controllers/notesController");

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;

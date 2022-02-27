const Notes = require("./../models/NotesModel");

const createNotes = async (req, res, next) => {
  try {
    const { notesContent, notesHeading } = req.body;

    const notes = await Notes.create({
      notesContent,
      notesHeading,
      user: req.user._id,
    });
    res.status(200).json({
      status: "success",
      notes,
    });
  } catch (err) {
    next(err);
  }
};
const userNotes = async (req, res, next) => {
  try {
    const notes = await Notes.find({ user: req.user._id }).select("-__v -user");
    res.status(200).json({
      notes: notes,
      status: "Success",
    });
  } catch (err) {
    next(err);
  }
};

const deleteNotes = async (req, res, next) => {
  try {
    const { noteId } = req.body;

    const deleteNote = await Notes.deleteOne({ _id: noteId });
    res.status(201).json({
      status: "success",
      message: "deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const updateNotes = async (req, res, next) => {
  try {
    const { _id, notesContent, notesHeading } = req.body;

    const updateNote = await Notes.findByIdAndUpdate(
      _id,
      {
        notesContent: notesContent,
        notesHeading: notesHeading,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      notes: updateNote,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createNotes, deleteNotes, updateNotes, userNotes };

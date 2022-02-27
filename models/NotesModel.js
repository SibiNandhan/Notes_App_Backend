const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema(
  {
    notesContent: {
      type: String,
    },
    notesHeading: {
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;

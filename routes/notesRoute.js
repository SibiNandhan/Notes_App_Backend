const express = require("express");
const router = express.Router();
const { protect } = require("./../controller/authController");
const {
  createNotes,
  updateNotes,
  deleteNotes,
  userNotes,
} = require("./../controller/notesController");

router.route("/createnote").post(protect, createNotes);
router.route("/deletenote").delete(protect, deleteNotes);
router.route("/updatenote").put(protect, updateNotes);
router.route("/getnotes").get(protect, userNotes);

module.exports = router;

const express = require("express");
const { NoteModel } = require("../model/db");
const { auth } = require("../middleware/auth");
const { userRouter } = require("./userModule");

const noteRouter = express.Router();
noteRouter.use(auth);

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.status(200).send({ msg: "A new note has been created." });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params
  console.log(noteID)
  const note = await NoteModel.findOne({_id:noteID});
  const payload = req.body;
  try {
    if (req.body.userID===note.userID) {
       await NoteModel.findByIdAndUpdate({_id:noteID},payload);
    
      res.status(200).send({ msg: "Notes with ID:${noteID} has been updated successfully." });
    } 
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

userRouter.delete("/delete/:noteID", async (req, res) => {
  const { noteID } = req.params
  console.log(noteID)
  const note = await NoteModel.findOne({_id:noteID});
console.log(note)
  try {
    if (req.body.userID===note.userID) {
       await NoteModel.findByIdAndDelete({_id:noteID});
    
      res.status(200).send({ msg: "Notes with ID:${noteID} has been deleted successfully." });
    } 
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = { noteRouter };

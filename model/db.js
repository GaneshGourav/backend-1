const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.mongoURL);

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  pass: String,
});

const NoteSchema = mongoose.Schema({
  title: String,
  body: String,
  userID: String,
  username: String,
});

const UserModel = mongoose.model("user", UserSchema);
const NoteModel = mongoose.model("note", NoteSchema);

module.exports = { connection, UserModel, NoteModel };

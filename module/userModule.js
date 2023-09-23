const express = require("express");
const { UserModel } = require("../model/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ username, email, pass: hash });
      await user.save();
      res.status(200).send({ msg: "A new user has been registered " });
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    bcrypt.compare(pass, user.pass, async (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userID: user._id, username: user.username },
          "Ganesh"
        );
        res.status(200).jsonp({ msg: "Login Successful", token: token });
      } else {
        res.status(200).json({ msg: "wrong Crendentials" });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = { userRouter };

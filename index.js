const express = require("express");
const { connection } = require("./model/db");
const { userRouter } = require("./module/userModule");
const { noteRouter } = require("./module/noteModule");
const {cors} = require("cors");
require("dotenv").config()

const app = express();
app.use(express.json());
// app.use(cors())

app.get("/", (req, res) => {
  res.status(200).send({ msg: "You are welcome to Home Page !" });
});

app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to dbs");
    console.log("poert is running at 7070");
  } catch (error) {
    console.log(error);
  }
});

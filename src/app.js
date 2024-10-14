const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// app.use("/admin", adminAuth);

app.get("/admin", adminAuth, (req, res) => {
  res.send("HEy Admin");
});

app.get("/userData", userAuth, (req, res, next) => {
  try {
    throw new Error("errorsnnfcdk");
    res.send("user set");
  } catch (err) {
    res.status(500).send("Server Maintainace");
  }
});

app.listen(7777, () => {
  console.log("listening on post 7777");
});

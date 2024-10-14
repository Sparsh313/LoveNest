const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res, next) => {
  res.send("user set");
});

app.get("/admin/getAlldata", (req, res, next) => {
  res.send("Admin Data sent");
  next();
});

app.get("/admin/deletedata", (req, res, next) => {
  res.send("Admin Data deleted");
  next();
});

app.listen(7777, () => {
  console.log("listening on post 7777");
});

const express = require("express");
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    // res.send("1st");
    console.log("1st");
    next();
  },
  (req, res, next) => {
    // res.send("2nd");
    console.log("2nd");
    next();
  },
  (req, res, next) => {
    // res.send("3rd");
    console.log("3rd");
    next();
  },
  (req, res, next) => {
    // res.send("4th");
    console.log("4th");
    next();
  },
  (req, res, next) => {
    res.send("5th");
    console.log("5th");
    next();
  }
);

app.listen(7777, () => {
  console.log("listening on post 7777");
});

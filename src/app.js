const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ Name: "Sparsh", Age: 20, gender: "male" });
});

app.post("/user", (req, res) => {
  res.send("Data saved succesfully");
});

app.patch("/user", (req, res) => {
  res.send("Data updated succesfully");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted succesfully");
});

app.get("/user/:Id/:name/:pass", (req, res) => {
  console.log(req.params);
  // console.log(req.query);
  res.send({ Name: "Sparsh", Age: 20, gender: "male" });
});

app.listen(7777, () => {
  console.log("listening on post 7777");
});

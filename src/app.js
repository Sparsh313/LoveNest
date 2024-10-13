const express = require("express");

const app = express();

app.use("/done", (req, res) => {
  res.send("Heyy complete");
});
app.use("/check", (req, res) => {
  res.send("Heyy checking");
});
app.use("/", (req, res) => {
  res.send("Heyy server");
});

app.listen(3000, () => {
  console.log("listening on post 7777");
});

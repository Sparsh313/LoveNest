const express = require("express");
const connectDB = require("./config/db");
const app = express();
const User = require("./model/user");

app.use(express.json());

app.post("/signup", async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added sucessfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/feed", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(401).send("Something went wrong");
  }
});

app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("no user");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(401).send("Something went wrong");
  }
});

app.delete("/user", async (req, res, next) => {
  console.log(req.body.userId);
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted");
  } catch (err) {
    res.status(401).send("Something went wrong");
  }
});

app.patch("/user", async (req, res, next) => {
  const userId = req.body.userId;
  console.log(req.body.userId);
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data);
    res.send("User updated");
  } catch (err) {
    res.status(401).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("DB Successfully connected");
    app.listen(7777, () => {
      console.log("listening on post 7777");
    });
  })
  .catch((err) => {
    console.log("DB not connected");
  });

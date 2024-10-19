const express = require("express");
const connectDB = require("./config/db");
const app = express();
const User = require("./model/user");
const ValidateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res, next) => {
  try {
    // Validation
    ValidateSignUpData(req, User);

    // Encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({ name, email, password: hashedPassword });
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

app.patch("/user/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const allowedUpdates = [
      "userId",
      "name",
      "age",
      "bio",
      "gender",
      "skills",
      "photos",
    ];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      allowedUpdates.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    console.log(req.body.skills.length);

    const maxSkillsAllowed = 10;
    if (data.skills.length > maxSkillsAllowed) {
      throw new Error("You can only add max of 10 skills");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    res.send("User updated");
  } catch (err) {
    res.status(401).send("Something went wrong :" + err.message);
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

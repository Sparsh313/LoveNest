const express = require("express");
const connectDB = require("./config/db");
const app = express();
const User = require("./model/user");
const ValidateSignUpData = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.get("/feed", userAuth, async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(401).send("Something went wrong");
  }
});

app.post("/signup", async (req, res, next) => {
  const { name, email, password, gender, age } = req.body;

  try {
    // Validation
    ValidateSignUpData(req, User);

    // Encryption
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
    });
    await user.save();
    res.send("User Added sucessfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERR::" + err.message);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      throw new Error("Invalid password");
    } else {
      //Create a token
      const token = jwt.sign({ id: user._id }, "heyy", { expiresIn: "7d" });
      //Send token in form of cookie
      res.cookie("token", token);
      res.send("Login sucessfull");
    }
  } catch (err) {
    res.status(400).send("Err:" + err.message);
  }
});

app.post("/req", userAuth, async (req, res, next) => {
  const user = req.user;
  console.log(user.email);
  res.send(user.name + " send u a frnd req");
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

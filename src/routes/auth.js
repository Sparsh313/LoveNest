const express = require("express");
const authRouter = express.Router();
const { ValidateSignUpData } = require("../utils/validation");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res, next) => {
  const { name, email, password, gender, age, photo, bio, skills } = req.body;
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
      photo,
      bio,
      skills,
    });
    const savedUser = await user.save();
    //Create a token
    const token = await jwt.sign({ id: user._id }, "heyy", { expiresIn: "7d" });
    //Send token in form of cookie
    res.cookie("token", token, { expires: new Date(Date.now() + 8000000) });

    res.json({ message: "User Added sucessfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/login", async (req, res, next) => {
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
      res.cookie("token", token, { expires: new Date(Date.now() + 8000000) });
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Err:" + err.message);
  }
});

authRouter.get("/logout", async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logged out");
});
module.exports = authRouter;

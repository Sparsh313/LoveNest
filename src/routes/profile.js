const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../model/user");
const { ValidateEditProfileData } = require("../utils/validation");
const { isLocale } = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERR::" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res, next) => {
  try {
    if (!ValidateEditProfileData(req)) {
      throw new Error("Invalid edit Request");
    }
    const loggedInUser = req.user;
    // // loggedInUser.name = req.body.name;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.name} user profile has been updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Err: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res, next) => {
  try {
    const user = req.user;
    const oldPass = req.body.oldPass;
    const isPassMatch = await bcrypt.compare(oldPass, user.password);
    if (!isPassMatch) {
      throw new Error("Write correct Password");
    }
    const newPass = req.body.newpass;
    const hashedNewPass = await bcrypt.hash(newPass, 10);

    user.password = hashedNewPass;

    await user.save();
    res.send({
      message: `${user.name}, Your Pass has been changed sussfully`,
    });
  } catch (err) {
    res.status(400).send("Err: " + err.message);
  }
});

// profileRouter.get("/feed", userAuth, async (req, res, next) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(401).send("Something went wrong:" + err.message);
//   }
// });

module.exports = profileRouter;

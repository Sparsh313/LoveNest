const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/req", userAuth, async (req, res, next) => {
  const user = req.user;
  console.log(user.email);
  res.send(user.name + " send u a frnd req");
});

module.exports = requestRouter;

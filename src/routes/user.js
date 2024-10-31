const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../model/user");
const Connection = require("../model/connection");

const User_Data = ["name", "age", "photo", "bio"];

userRouter.get("/user/feed", userAuth, async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(401).send("Something went wrong:" + err.message);
  }
});
// Connection request recieved
userRouter.get("/user/request", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await Connection.find({
      toUserId: loggedInUser.id,
      status: "intrested",
    }).populate("fromUserId", User_Data);
    //   .populate("toUserId", ["name"]);

    res.send(connectionRequest);
  } catch (err) {
    res.status(400).json({ message: "Err:" + err.message });
  }
});

// your connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // Find connections where the logged-in user is either the sender or receiver with status "accepted"
    const connections = await Connection.find({
      status: "accepted",
      $or: [{ fromUserId: loggedInUser.id }, { toUserId: loggedInUser.id }],
    })
      .populate("fromUserId", User_Data)
      .populate("toUserId", User_Data);

    //  kisse req aa rhi wp show krege bs kuch extra ni with some conditions
    const data = connections.map((row) => {
      if (row.fromUserId.id === loggedInUser.id) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });
    res.json({ data });
  } catch (err) {
    res.status(400).json({ message: "Err: " + err.message });
  }
});

module.exports = userRouter;

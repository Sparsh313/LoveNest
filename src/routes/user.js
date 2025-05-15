const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../model/user");
const Connection = require("../model/connection");

const User_Data = ["name", "age", "photo", "bio"];

// Feed api
userRouter.get("/user/feed", userAuth, async (req, res, next) => {
  try {
    const loggedInUser = req.user;

    // Define age range
    const ageRange = 5;
    const minAge = loggedInUser.age - ageRange;
    const maxAge = loggedInUser.age + ageRange;

    // find all connection req (sent,recieve)
    const allUsers = await Connection.find({
      $or: [{ fromUserId: loggedInUser.id }, { toUserId: loggedInUser.id }],
    }).select("fromUserId , toUserId");

    // Hide all user jisne tmhe req bheji hai ya jisko tmnr
    const hideUser = new Set();
    allUsers.forEach((req) => {
      hideUser.add(req.fromUserId.toString());
      hideUser.add(req.toUserId.toString());
    });
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (limit > 50) {
      limit = 50;
    }
    const skip = (page - 1) * limit;

    // Ye code se banda khud ka card hide kr rha aur (sent,recieve) wala hide kre ga
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUser) } }, //if element is not in array then include it
        { _id: { $ne: loggedInUser.id } }, // my own card
        { age: { $gte: minAge, $lte: maxAge } },
        { gender: { $ne: loggedInUser.gender } },
      ],
    })
      .skip(skip)
      .limit(limit);

    // count total users
    const totalUsers = await User.countDocuments({
      $and: [
        { _id: { $nin: Array.from(hideUser) } },
        { _id: { $ne: loggedInUser.id } },
        { age: { $gte: minAge, $lte: maxAge } },
        { gender: { $ne: loggedInUser.gender } },
      ],
    });

    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      currentPage: page,
      totalPages,
      totalUsers,
      feed: users,
    });
  } catch (err) {
    res.status(401).send("Something went wrong:" + err.message);
  }
});

// Connection request recieved
userRouter.get("/user/request", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // check kr rhe Connection DB me ki toUser mai hi hu na aur intrested hai na samne wala
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

// your connections / friends
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

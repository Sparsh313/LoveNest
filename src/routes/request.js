const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { connection } = require("mongoose");
const Connection = require("../model/connection");
const requestLimiter = require("../middlewares/rateLimit");
const User = require("../model/user");

const requestRouter = express.Router();

requestRouter.use(requestLimiter);

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.user.id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // If status allowed
      allowedStatus = ["intrested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.send("Invalid status:" + status);
      }
      // Check if users exist in DB
      const fromUserExists = await User.findById(fromUserId);
      const toUserExists = await User.findById(toUserId);

      if (!fromUserExists || !toUserExists) {
        return res.status(404).send("One or both users do not exist.");
      }
      // Check if there is an existing connection request in either direction
      const existingRequest = await Connection.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        // Agar request already exist karti hai toh message bhejo
        return res.status(400).json({
          message: "Connection request already exists",
        });
      }
      // IF EVERYTHINGS FINE
      // Build new Connection
      const connectionReq = new Connection({
        fromUserId,
        toUserId,
        status,
      });

      let message;
      if (status === "intrested") {
        message = `${status} in ${toUserExists.name} hn mmmm`;
      } else {
        message = `you're not intrested in ${toUserExists.name} koi na bohot log hai`;
      }
      const data = await connectionReq.save();
      res.json({
        message: message,
        data: data,
      });
    } catch (err) {
      res.status(400).send("Err:" + err.message);
    }
  }
);

module.exports = requestRouter;

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
      const { status, toUserId } = req.params;

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
      // Saving Data
      const data = await connectionReq.save();

      // Custom message
      let message;
      if (status === "intrested") {
        message = `${status} in ${toUserExists.name} hn mmmm`;
      } else {
        message = `you're not intrested in ${toUserExists.name} koi na bohot log hai`;
      }
      res.json({
        message: message,
        data: data,
      });
    } catch (err) {
      res.status(400).send("Err:" + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestedId",
  userAuth,
  async (req, res) => {
    try {
      const LoggedInUser = req.user;
      const { status, requestedId } = req.params;
      // Validate the status
      allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status:" + status);
      }
      console.log(requestedId);
      console.log(LoggedInUser.id);
      // Sparsh sending req to Alia
      // is case me LoggedInUser Alia hogi, kyuki Alia ko decide krna hai na ki accept krna ya reject
      // Aur Status hamesha Intrested hona chahiye jisse hm assure kre ki only right swipe pe hi req jae
      const connectionRequest = await Connection.findOne({
        fromUserId: requestedId,
        toUserId: LoggedInUser.id,
        status: "intrested",
      });

      const Sender = await User.findById(requestedId);
      const nameOfSender = Sender.name;

      if (!connectionRequest) {
        return res.status(404).json({ message: `connection req not found` });
      }
      connectionRequest.status = status;
      await connectionRequest.save();

      let message;
      if (status === "accepted") {
        message = `You have accepted the connection request from ${nameOfSender}`;
      } else {
        message = `You have rejected the connection request from ${nameOfSender}`;
      }

      res.status(200).json({
        message: message,
        data: connectionRequest,
      });
    } catch (err) {
      res.status(400).send("Err:" + err.message);
    }
  }
);
module.exports = requestRouter;

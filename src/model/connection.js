const mongoose = require("mongoose");
const validator = require("validator");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    toUserId: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: {
        values: ["intrested", "ignored", "accepted", "rejected"],
        message: `{Value} not supported`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

// Check if user is trying to send request to themselves
connectionSchema.pre("save", function (next) {
  const connection = this;
  if (connection.fromUserId.equals(connection.toUserId)) {
    throw new Error(
      "You cannot send a request to yourself. krna kya chahate ho bhai"
    );
  }
  next();
});

const Connection = mongoose.model("Connection", connectionSchema); //Model
module.exports = Connection;

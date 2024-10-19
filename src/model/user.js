const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 70,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
      lowercase: true,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 200,
      default: "I am here for making friends",
      trim: true,
    },
    photo: {
      type: String,
      validate: {
        validator: function (v) {
          return validator.isURL(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    skills: {
      type: [String],
    },

    // location: {
    //   type: {
    //     type: String,
    //     enum: ["Point"],
    //     required: true,
    //   },
    //   coordinates: {
    //     type: [Number],
    //     required: true,
    //   },
    // },
    // preferences: {
    //   gender: {
    //     type: String,
    //     enum: ["male", "female", "other", "any"],
    //     default: "any",
    //   },
    //   ageRange: {
    //     min: {
    //       type: Number,
    //       default: 18,
    //     },
    //     max: {
    //       type: Number,
    //       default: 70,
    //     },
    //   },
    //   maxDistance: {
    //     type: Number,
    //     default: 20,
    //   },
    // },
    // matches: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", // References the User model for matched users
    //   },
    // ],
    // likedUsers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", // Users the current user has liked
    //   },
    // ],
    // dislikedUsers: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User", // Users the current user has disliked
    //   },
    // ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

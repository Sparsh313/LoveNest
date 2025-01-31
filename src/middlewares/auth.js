const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

const adminAuth = (req, res, next) => {};
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("!! Pls Log in again");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User does not exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERR:" + err.message);
  }
};
module.exports = { userAuth };

const rateLimit = require("express-rate-limit");

// Set up the rate limiter for 20 requests per day
const requestLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 20,
  message: "You have exceeded the 20 requests in one day limit!",
});

module.exports = requestLimiter;

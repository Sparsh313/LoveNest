const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sparshsingh03012003:F5qK97ItOxLFdJg1@cluster.ntch9.mongodb.net/devTinder?tls=true"
  );
};

module.exports = connectDB;

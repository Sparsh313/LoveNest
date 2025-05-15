const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const Initializesockets = require("./utils/sockets");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
Initializesockets(server);

connectDB()
  .then(() => {
    console.log("DB Successfully connected");
    const port = process.env.PORT || 5173;
    server.listen(port, () => {
      console.log("listening on post 7777");
    });
  })
  .catch((err) => {
    console.log("DB not connected");
  });

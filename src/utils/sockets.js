const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../model/chats");

// Securing my RoomID
const SecretRoomId = (userId, targetId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetId].sort().join("_"))
    .digest("hex");
};

const Initializesockets = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetId, userName }) => {
      const roomId = SecretRoomId(userId, targetId);
      console.log(`${userName} joned ${roomId}`);
      socket.join(roomId);
    });

    socket.on("sendMsg", async ({ userName, targetId, userId, text }) => {
      const roomId = SecretRoomId(userId, targetId);
      console.log(userName + " sends " + text);

      // Save the messages to DB........................................................
      // Phele find kro ki chat exist krti hai ya ni
      try {
        let chat = await Chat.findOne({
          participants: { $all: [userId, targetId] },
        });
        // if not then Create a new Chat
        if (!chat) {
          chat = new Chat({
            participants: [userId, targetId],
            messages: [],
          });
        }
        // after creating a chat push the message
        chat.messages.push({ senderId: userId, text });
        //save the chats
        await chat.save();
        io.to(roomId).emit("msgRecieved", { userName, text });
      } catch (err) {
        console.log(err);
      }
     });

    socket.on("disconnet", () => {});
  });
};
module.exports = Initializesockets;

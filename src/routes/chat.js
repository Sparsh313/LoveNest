// const express = require("express");
// const { Chat } = require("../model/chats");
// const { userAuth } = require("../middlewares/auth");

// const chatRouter = express.Router();

// chatRouter.get("/chat/:targetId", userAuth, async (req, res) => {
//   const { targetId } = req.params;
//   const userId = req.user.id;
//   try {
//     let chat = await Chat.findOne({
//       participants: { $all: [userId, targetId] },
//     }).populate({
//       path: "messages.senderId",
//       select: "name ",
//     });
//     if (!chat) {
//       chat = new Chat({
//         participants: [userId, targetId],
//         messages: [],
//       });
//       await chat.save();
//     }
//     res.json(chat);
//   } catch (err) {
//     console.log(err);
//     // res.status(500).json({ error: "Something went wrong" });
//   }
// });

// module.exports = chatRouter;

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Chat } = require("../model/chats");
const User = require("../model/user");

const chatRouter = express.Router();

// chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
//   const { targetUserId } = req.params;
//   const userId = req.user._id;
//   const name= req.user.name

//   console.log(`uid: ${userId}, tid: ${targetUserId}, name:${name}`);

//   try {
//     let chat = await Chat.findOne({
//       participants: { $all: [userId, targetUserId] },
//     }).populate({
//       path: "messages.senderId",
//       select: "name",
//     });

//     if (!chat) {
//       chat = new Chat({
//         participants: [userId, targetUserId],
//         messages: [],
//       });
//       await chat.save();
//     }

//     res.json(chat);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = chatRouter;
chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  try {
    const targetUser = await User.findById(targetUserId).select("name photo");
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    // 1) Find or create the Chat thread
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "_id",
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }

    // 2) Map the messages into a simple array for the frontend
    const payload = chat.messages.map((m) => ({
      text: m.text,
      senderId: m.senderId._id || m.senderId, // ensure it’s an ID
      timestamp: m.createdAt, // if you want timestamps
    }));

    // 3) Send back just the array (not the full document)
    return res.json({ messages: payload, targetUser });
  } catch (err) {
    console.error("Chat history error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = chatRouter;

# 💘 LoveNest Backend

This is the backend service for **LoveNest**, a real-time social matchmaking web app inspired by Tinder. Built using **Node.js**, **Express**, **MongoDB**, and **Socket.IO**, it provides a secure RESTful API and real-time chat functionalities.

## 🚀 Features

- 🔐 JWT Authentication with middleware protection
- 💬 Real-time Chat with WebSocket (Socket.IO)
- 👫 Friend Request System (Send/Accept/Reject)
- ⚙️ Rate Limiting to prevent abuse
- 🧩 Modular Routes & Middleware
- 🛡️ Validation, Authorization, and Secure Headers
- 🌐 MongoDB for persistent NoSQL storage

## 🧠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Socket.IO**
- **JWT (JSON Web Token)**
- **dotenv**
- **cors**, **helmet**, **express-rate-limit**

## 🗂️ Project Structure

src/
├── config/ # Database config
│ └── db.js
│
├── middlewares/ # Auth & rate limiter
│ ├── auth.js
│ └── rateLimit.js
│
├── model/ # Mongoose models
│ ├── chats.js
│ ├── connection.js
│ └── user.js
│
├── routes/ # API endpoints
│ ├── auth.js
│ ├── chat.js
│ ├── profile.js
│ ├── request.js
│ └── user.js
│
├── utils/ # Socket setup & validators
│ ├── sockets.js
│ └── validation.js
│
├── app.js # Entry point of the app
└── .env # Environment variables

# 🛠️ Setup Instructions

### 1. Clone the Repo
git clone https://github.com/Sparsh313/Lovenes.git
cd devTinder

### 2.Install Dependencies
npm run start

### 3. Environment Variables
Create a .env file in the root directory and add the following:

MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<your-db>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=7777

# 🧪 API Endpoints
Method	Route	Description
POST	/api/auth	Login/Register user
GET	  /api/user	Get user profile
POST	/api/request	Send friend request
POST	/api/chat	Initiate a chat
GET	  /api/profile	Fetch opposite-gender feed

# 📡 WebSocket Events (/utils/sockets.js)
connect
send-message
receive-message
user-online / user-offline

# 📄 License
This project is open-source under the MIT License.

# 📧 Contact
For suggestions or feedback: https://www.linkedin.com/in/sparsh-singh-895320253/

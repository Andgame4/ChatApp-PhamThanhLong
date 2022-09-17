const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());
// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`connect: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("disconnect: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("joinRoom", (room) => socket.join(room));

  socket.on("newMessage", ({ details, room }) => {
    console.log(room, details);
    io.in(room).emit("getLatestMessage", details);
  });
});
app.get("/", (req, res) => {
  res.send("Socket chat Back-End started.");
});

server.listen(8000, () => console.log("App started at port 8000"));

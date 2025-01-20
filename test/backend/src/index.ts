import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("msg", (msg) => {
    console.log(msg);
    io.emit("msg", msg);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

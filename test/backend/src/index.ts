import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
let messages: string[] = [];

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("msg", "welcome bud : this is message from server");
  socket.on("cli", (message) => {
    console.log(message);
    socket.emit("message", message);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

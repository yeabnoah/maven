import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
let messages: string[] = [];

const io = new Server(server, {
  cors: {
    origin: "*", // Allows all origins (not recommended for production)
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send welcome message when user connects
  socket.emit("msg", "Welcome bud: This is a message from the server");

  // Handle incoming messages from client
  socket.on("cli", (message) => {
    console.log("Received message:", message);
    messages.push(message);
    io.emit("message", JSON.stringify(messages)); // Emit updated messages to all clients
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

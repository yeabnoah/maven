import express, { Request, Response } from "express";
import http from "http";
import { Server as socketIoServer } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new socketIoServer(server);

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    message: "app running successfully",
    data: "this app is running hopefully",
  });
});

server.listen(3000, () => {
  console.log("server running in local host");
});

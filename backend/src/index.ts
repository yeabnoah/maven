import { createServer } from "http";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Request, Response } from "express";
import { auth } from "./lib/auth";
import userRoute from "./routes/user.route";
import { config } from "dotenv";
import bodyParser from "body-parser";
import messageRoute from "./routes/message.route";
import { Server, Socket } from "socket.io";

config();
let counter = 0;
export const userMap: { [key: string]: string } = {};
const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`New connection attempt, socket ID: ${socket.id}`);

  const userId = (socket.handshake.query.userId as string) || "unknown_user";
  console.log(`User connected with ID: ${userId}`);

  userMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userMap));

  counter += 1;
  console.log(`Connected users: ${counter}`);
  console.log(userMap);

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userMap[userId];
    io.emit("getOnlineUsers", Object.keys(userMap));
  });
});

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/message", messageRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from Maven, app is working fine." });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy." });
});

server.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});

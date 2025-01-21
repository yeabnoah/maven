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
const userMap: { [key: string]: string } = {};
const port = process.env.PORT as string | 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`user connected`);

  const userId = socket.handshake.query.userId as string;
  const socketId = socket.id;
  userMap[userId] = socketId;

  counter += 1;
  console.log(`user amount : ${counter}`);
  console.log(userMap);
});

app.use(
  cors({
    origin: "http://localhost:5000",
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
  res.json({
    message:
      "hello from maven this is just to check if the app is working and hopefully it works",
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(400).json({
    message: "this is going to be awesome rights",
  });
});

server.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});

import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Request, Response } from "express";
import { auth } from "./lib/auth";
import userRoute from "./routes/user.route";
import { config } from "dotenv";
import bodyParser from "body-parser";
import messageRoute from "./routes/message.route";

config();
const app = express();
const port = 3000;

// CORS middleware should be used before any routes to ensure the headers are added to all requests
app.use(
  cors({
    origin: "http://localhost:5000", // Adjust with the correct client-side origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // Ensure that credentials (cookies, etc.) are sent with requests
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

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});

import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Request, Response } from "express";
import { auth } from "./lib/auth";
import userRoute from "./routes/user.route";

const app = express();
const port = 3000;

app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());

app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello from maven",
  });
});

app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});

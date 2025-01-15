import express, { Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
const port = 3000;

app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello from maven",
  });
});

app.listen(port, () => {
  console.log(`Better Auth app listening on port ${port}`);
});

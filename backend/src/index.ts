import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello world",
  });
});

app.listen(3000, () => {
  console.log("app running on http://localhost:3000");
});

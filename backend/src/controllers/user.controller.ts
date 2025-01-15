import { Request, Response } from "express";

const getUserInfo = (req: Request, res: Response) => {
  res.json({
    message: "welcome to user api",
  });
};

export default getUserInfo;

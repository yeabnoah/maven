import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(400).json({
      message: "unauthorized",
    });

    return;
  }

  req.user = session.user;
  next();
};

export default authMiddleware;

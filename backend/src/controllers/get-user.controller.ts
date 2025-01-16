import { Request, Response } from "express";
import authMiddleware from "../middleware/auth-middleware";
import { auth } from "../lib/auth";
import { Session, User } from "better-auth/types";
import { prisma } from "../lib/prisma.config";
import cookieInterface from "../interface/cookie.interface";

const getUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(400).json({
        message: "you are not authorized",
      });
      return;
    }

    const userFromDb = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (!userFromDb) {
      console.log("error occurred while searching user in DB");
      res.status(400).json({
        message: "could't find user",
      });
      return;
    }

    res.status(201).json({
      message: "user found successfully",
      data: userFromDb,
    });
  } catch (error) {
    res.status(500).json({
      message: `error occurred while getting user data : ${error}`,
    });
  }
};

export default getUser;

import { Request, Response } from "express";
import { prisma } from "../lib/prisma.config";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      console.log("Authorization error");
      res.status(400).json({
        message: "you are not authorized",
      });
    }

    const allUsers = await prisma.user.findMany({
      where: {
        id: {
          not: user?.id,
        },
      },
    });

    res.status(201).json({
      message: "users fetched successfully",
      data: allUsers,
    });
  } catch (err) {
    console.log("error happened while getting all the users");
    res.status(500).json({
      message: "error occurred",
      error: err,
    });
  }
};

export default getAllUsers;

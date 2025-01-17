import { Request, Response } from "express";
import { prisma } from "../lib/prisma.config";

const getMessage = async (req: Request, res: Response) => {
  try {
    const { id: anotherPerson } = req.params;
    const me = req.user?.id;

    if (!me || !anotherPerson) {
      console.log("must provide both your and the other persons id");
      res.status(411).json({
        message: "must provide both your and the other persons id",
      });
      return;
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: me, receiverId: anotherPerson },
          {
            senderId: anotherPerson,
            receiverId: me,
          },
        ],
      },
    });

    res.status(201).json({
      message: "messages successfully fetched",
      data: messages,
    });
  } catch (err) {
    console.log("error happened while getting all the users");
    res.status(500).json({
      message: "error occurred",
      error: err,
    });
    return;
  }
};

export default getMessage;

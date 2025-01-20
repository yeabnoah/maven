import { Request, Response } from "express";
import { prisma } from "../lib/prisma.config";

const updateUser = async (req: Request, res: Response) => {
  try {
    const { bio, name } = req.body;
    const user = req.user;


    if (!bio && !name) {
      res.status(400).json(
        { message: "No valid fields to update." }
      );
      return;
    }

    if (!user?.id) {
      res.status(401).json(
        { message: "Unauthorized: User ID missing." });
    }

    const toBeUpdatedInfo: { name?: string; bio?: string } = {};

    if (name) toBeUpdatedInfo.name = name;
    if (bio) toBeUpdatedInfo.bio = bio;

    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: toBeUpdatedInfo,
    });

    res.status(200).json({
      message: "User data updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error occurred while updating user" });
  }
};

export default updateUser;

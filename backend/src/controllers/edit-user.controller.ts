import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import { prisma } from "../lib/prisma.config";
import { Prisma } from "@prisma/client";

export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received data:", req.body);

    const user = req.user;
    const { name, bio, image } = req.body;

    if (!user) {
      res.status(401).json({ message: "You are not authorized" });
      return;
    }

    if (!image && !name && !bio) {
      res.status(400).json({ message: "At least one field is required" });
      return;
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "user_images",
        resource_type: "image",
      });

      updateData.image = uploadedImage.secure_url;
    }

    if (name) {
      updateData.name = name;
    }

    if (bio) {
      updateData.bio = bio;
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    res
      .status(200)
      .json({ message: "Successfully updated user", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error); // Log the error
    res
      .status(500)
      .json({ message: "Error occurred while updating user", error });
  }
};

// Express route to handle JSON requests
export const editUserRoute = [editUser];

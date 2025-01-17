import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import { prisma } from "../lib/prisma.config";
import { Prisma } from "@prisma/client";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;
    const { name } = req.body;
    const file = req.file;

    if (!user) {
      res.status(401).json({ message: "You are not authorized" });
      return;
    }

    if (!file && !name) {
      res.status(400).json({ message: "At least one field is required" });
      return;
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (file) {
      const uploadedImage = await cloudinary.uploader.upload(file.path, {
        folder: "user_images",
        resource_type: "image",
      });

      updateData.image = uploadedImage.secure_url;
    }

    if (name) {
      updateData.name = name;
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    res
      .status(200)
      .json({ message: "Successfully updated user", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error occurred while updating user", error });
  }
};

export const editUserRoute = [upload.single("image"), editUser];

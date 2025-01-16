import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import { prisma } from "../lib/prisma.config";
import { Prisma } from "@prisma/client";

const editUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { image, name } = req.body;

    if (!user) {
      res.status(400).json({
        message: "You are not authorized",
      });
      return;
    }

    if (!image && !name) {
      res.status(400).json({
        message: "At least one field is required",
      });
      return;
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (image) {
      const uploadedImageLink = await cloudinary.uploader.upload(image);

      if (!uploadedImageLink) {
        res.status(422).json({
          message: "Error happened while uploading image",
        });
        return;
      }

      updateData.image = uploadedImageLink.secure_url;
    }

    if (name) {
      updateData.name = name;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: updateData,
    });

    res.status(200).json({
      message: "Successfully updated user",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating user",
      error,
    });
  }
};

export default editUser;

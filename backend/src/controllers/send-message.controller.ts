import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import { prisma } from "../lib/prisma.config";
import { io, userMap } from "..";
import { getReceiverSocketId } from "../lib/getSocketId";

const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: receiverId } = req.params;
    const user = req.user;
    const { textMessage, image } = req.body;

    if (!user || !user.id) {
      res.status(401).json({
        message: "User not authenticated or user.id is undefined",
      });
      return;
    }

    if (!receiverId) {
      res.status(400).json({
        message: "Receiver ID is required",
      });
      return;
    }

    if (!textMessage && !image) {
      res.status(400).json({
        message: "Please provide either text",
      });
      return;
    }

    let imageUrl: string | null = null;
    if (image) {
      try {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        const mimeTypeMatch = image.match(
          /^data:(image\/(jpeg|png|jpg));base64,/
        );

        if (!mimeTypeMatch) {
          res.status(400).json({
            message: "Invalid image format. Image must be base64 encoded.",
          });
          return;
        }

        const mimeType = mimeTypeMatch[1];
        if (!allowedMimeTypes.includes(mimeType)) {
          res.status(400).json({
            message: "Invalid file type. Only JPEG and PNG are allowed.",
          });
          return;
        }

        const base64Data = image.split(",")[1];

        const uploadResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "message_images",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            }
          );

          const buffer = Buffer.from(base64Data, "base64");
          uploadStream.end(buffer);
        });

        if (
          uploadResponse &&
          typeof uploadResponse === "object" &&
          "secure_url" in uploadResponse
        ) {
          imageUrl = uploadResponse.secure_url as string;
        } else {
          throw new Error("Failed to get secure URL from Cloudinary");
        }
      } catch (cloudinaryErr) {
        console.error("Cloudinary upload error:", cloudinaryErr);
        res.status(500).json({
          message: "Failed to upload image",
          error:
            cloudinaryErr instanceof Error
              ? cloudinaryErr.message
              : "Unknown error",
        });
        return;
      }
    }

    const messageData = {
      senderId: user.id,
      receiverId: receiverId,
      messageContent: textMessage || "",
      image: imageUrl,
    };

    const newMessage = await prisma.message.create({
      data: messageData,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({
      message: "Message sent successfully",
      newMessage: {
        id: newMessage.id,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
        messageContent: newMessage.messageContent,
        image: newMessage.image,
      },
    });
  } catch (err) {
    console.error("Error occurred while sending message:", err);
    res.status(500).json({
      message: "An error occurred while sending the message",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

export const sendMessageRoute = [sendMessage];
export default sendMessage;

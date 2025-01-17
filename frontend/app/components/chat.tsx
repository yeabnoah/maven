"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSendMessage = async () => {
    if (!message && !image) {
      toast.error("Please provide either a message or an image");
      return;
    }

    try {
      let imageBase64 = null;
      if (image) {
        // Convert image to base64
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject(new Error("Failed to convert image to base64"));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(image);
        });
      }

      const payload = {
        textMessage: message || "",
        image: imageBase64,
      };

      const response = await axios.post(
        `http://localhost:3000/message/send/awygYNh3ocgvMy25T1uygqsdaxPFGgHC`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Message sent successfully!");
        console.log(response.data);

        setMessage("");
        setImage(null);

        // Clear the file input
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send message.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-4 border-t my-44 flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded mr-2"
      />

      <input
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleImageChange}
        className="mr-2"
      />

      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;

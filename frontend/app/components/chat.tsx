"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Image as ImageIcon, Send, X, Smile } from "lucide-react";
import imageCompression from "browser-image-compression";
import useChatStore from "@/store/chat.store";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

// Define custom error types
class ImageProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageProcessingError";
  }
}

class FileSizeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileSizeError";
  }
}

const MAX_FILE_SIZE_MB = 10; // 10MB max file size before compression

const ChatInput = () => {
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { selectedUser } = useChatStore();

  const validateImage = (file: File) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > MAX_FILE_SIZE_MB) {
      throw new FileSizeError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      throw new ImageProcessingError(
        "Invalid file type. Only JPEG and PNG are allowed."
      );
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      try {
        validateImage(file);

        setImage(file);
        setMessage("");
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.onerror = () => {
          throw new ImageProcessingError("Failed to read image file");
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError(err as Error);
        clearImage();
      }
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    setError(null);
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!selectedUser) {
      setError(new Error("No user selected"));
      return;
    }

    if (!message && !image) {
      setError(new Error("Please provide either a message or an image"));
      return;
    }

    try {
      let imageBase64 = null;
      if (image) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(image, options);
          const reader = new FileReader();
          imageBase64 = await new Promise<string>((resolve, reject) => {
            reader.onload = () => {
              if (typeof reader.result === "string") {
                resolve(reader.result);
              } else {
                reject(
                  new ImageProcessingError("Failed to convert image to base64")
                );
              }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(compressedFile);
          });
        } catch {
          throw new ImageProcessingError("Failed to process image");
        }
      }

      const payload = {
        textMessage: message || "",
        image: imageBase64,
      };

      await axios.post(
        `http://localhost:3000/message/send/${selectedUser.id}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        }
      );

      toast.success("Message sent successfully!");

      setMessage("");
      setImage(null);
      setImagePreview(null);
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err) {
      if (err instanceof ImageProcessingError || err instanceof FileSizeError) {
        setError(err);
      } else if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message: string }>;
        if (axiosError.response?.status === 413) {
          setError(new FileSizeError("File size too large for server"));
        } else {
          setError(
            new Error(
              axiosError.response?.data?.message || "Failed to send message"
            )
          );
        }
      } else {
        setError(new Error("An unexpected error occurred"));
      }
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-4">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <p className="font-semibold">{error.name}</p>
          <p>{error.message}</p>
        </div>
      )}

      {imagePreview && (
        <div className="mb-4 relative w-fit">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-[200px] max-h-[200px] rounded-lg object-cover"
          />
          <button
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value) {
                clearImage();
              }
            }}
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            disabled={!!image}
          />

          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`btn btn-circle ${
              !!image ? "text-gray-400" : "text-yellow-500"
            }`}
            disabled={!!image}
          >
            <Smile size={20} />
          </button>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div className="absolute bottom-full right-0 mb-2">
              <div className="relative">
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-10"
                  onClick={() => setShowEmojiPicker(false)}
                >
                  <X size={16} />
                </button>
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  autoFocusSearch={false}
                  width={300}
                  height={400}
                  // theme="dark"
                  searchPlaceholder="Search emoji..."
                  skinTonesDisabled
                  previewConfig={{
                    showPreview: false,
                  }}
                  lazyLoadEmojis
                  className="!bg-base-300 !border-base-content/10"
                  style={
                    {
                      "--epr-bg-color": "hsl(var(--b3))",
                      "--epr-category-label-bg-color": "hsl(var(--b3))",
                      "--epr-text-color": "hsl(var(--bc))",
                      "--epr-hover-bg-color": "hsl(var(--b2))",
                      "--epr-search-border-color": "hsl(var(--bc) / 0.2)",
                      "--epr-category-label-text-color": "hsl(var(--bc) / 0.7)",
                      "--epr-picker-border-color": "hsl(var(--bc) / 0.2)",
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleImageChange}
            className="hidden"
            id="image-input"
          />

          {/* Image Button */}
          <button
            type="button"
            className={`btn btn-circle ${
              image ? "text-gray-400" : "text-emerald-500"
            }`}
            onClick={() => {
              if (!message) {
                const fileInput = document.querySelector(
                  'input[type="file"]'
                ) as HTMLInputElement;
                fileInput?.click();
              }
            }}
            disabled={!!message}
          >
            <ImageIcon size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!message.trim() && !image}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;

"use client";

import useChatStore from "@/store/chat.store";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Image as ImageIcon, Send, X, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

interface formInterface {
  name: string;
}

const ChatSendUi = () => {
  const { register, handleSubmit, reset, watch } = useForm<formInterface>();
  const { sendChat } = useChatStore();
  const [image, setImage] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messageText = watch("name", "");

  const onSubmit: SubmitHandler<formInterface> = async (data) => {
    if (!data.name && !image) {
      toast.error("Please provide a message or select an image.");
      return;
    }

    try {
      if (image) {
        await sendChat(data.name, image);
        setImage(null);
      } else {
        await sendChat(data.name);
      }
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileData = e.target.files[0];

      if (!fileData.type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(fileData);
    }
  };

  const cancelImage = () => {
    setImage(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="w-full">
      {/* Image Preview */}
      {image && (
        <div className="mb-4">
          <div className="relative group">
            <img
              src={image}
              alt="Preview"
              className="w-full max-h-[200px] object-contain rounded-lg border border-gray-200"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
              <button
                onClick={cancelImage}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${showEmojiPicker ? "bg-gray-100 text-indigo-500" : "text-gray-500"
                }`}
              disabled={!!image}
            >
              <Smile size={20} />
            </button>

            {/* Image Upload Button */}
            <label className={`p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer ${image ? "text-indigo-500" : "text-gray-500"
              }`}>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                disabled={!!messageText}
              />
              <ImageIcon size={20} />
            </label>
          </div>

          <input
            {...register("name")}
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none min-w-0"
            disabled={!!image}
          />

          <button
            type="submit"
            disabled={!messageText.trim() && !image}
            className={`p-2 rounded-full transition-colors ${!messageText.trim() && !image
              ? "bg-gray-100 text-gray-400"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
          >
            <Send size={20} />
          </button>
        </div>

        {/* Emoji Picker Popup */}
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-2">
            <div className="relative shadow-xl rounded-lg">
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50 z-10"
              >
                <X size={16} className="text-gray-500" />
              </button>
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  const input = document.querySelector('input[name="name"]') as HTMLInputElement;
                  if (input) {
                    const start = input.selectionStart || 0;
                    const end = input.selectionEnd || 0;
                    const value = input.value;
                    input.value = value.substring(0, start) + emojiData.emoji + value.substring(end);
                    input.selectionStart = input.selectionEnd = start + emojiData.emoji.length;
                    input.focus();
                  }
                  setShowEmojiPicker(false);
                }}
                autoFocusSearch={false}
                width={300}
                height={400}
                searchPlaceholder="Search emoji..."
                skinTonesDisabled
                previewConfig={{
                  showPreview: false,
                }}
                lazyLoadEmojis
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatSendUi;

"use client";

import useChatStore from "@/store/chat.store";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Image as ImageIcon, Send } from "lucide-react";

interface formInterface {
  name: string;
}

const ChatSendUi = () => {
  const { register, handleSubmit, reset } = useForm<formInterface>();
  const { sendChat } = useChatStore();
  const [image, setImage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<formInterface> = async (data) => {
    if (!data.name && !image) {
      toast.error("Please provide a message or select an image.");
      return;
    }

    if (image) {
      await sendChat(data.name, image);
      setImage(null);
    } else {
      await sendChat(data.name);
    }
    reset();
  };

  const handleImageStuff = (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <div className="w-full bg-white rounded-xl">
      {image && (
        <div className="mb-4 flex flex-col items-end">
          <button
            onClick={cancelImage}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <img
            src={image}
            alt="Preview"
            className="max-h-60 object-contain rounded-lg border border-gray-200 mt-2"
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
      >
        <label className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-600 rounded-full cursor-pointer transition-colors">
          <input type="file" className="hidden" onChange={handleImageStuff} accept="image/*" />
          <ImageIcon size={20} />
        </label>

        <input
          {...register("name")}
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
        />

        <button
          type="submit"
          className="flex items-center justify-center w-10 h-10 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatSendUi;

"use client";

import useChatStore from "@/store/chat.store";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface formInterface {
  name: string;
}

const ChatSendUi = () => {
  const { register, handleSubmit } = useForm<formInterface>();
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
    <div className="bg-base-100 shadow-lg w-[85vw] mx-auto lg:mx-0 lg:w-[65%] rounded-lg fixed bottom-0 p-4">
      {image && (
        <div className="mb-4 flex-col items-end flex">
          <button
            onClick={cancelImage}
            className=" bg-error text-white text-sm px-2 py-1 rounded-lg hover:bg-error-focus"
          >
            Cancel
          </button>
          <img
            src={image}
            alt="Preview"
            className=" max-h-60 object-contain rounded-lg border border-base-300"
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3 border-t border-base-300 pt-4"
      >
        <label className="flex items-center justify-center w-10 h-10 bg-base-200 text-base-content rounded-full cursor-pointer hover:bg-base-300">
          <input type="file" className="hidden" onChange={handleImageStuff} />
          📎
        </label>

        <input
          {...register("name")}
          type="text"
          placeholder="Type your message..."
          className="flex-1 input input-bordered input-sm focus:outline-none"
        />

        <button type="submit" className="btn btn-primary btn-sm">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatSendUi;

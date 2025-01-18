"use client";

import useChatStore from "@/store/chat.store";
import { SubmitHandler, useForm } from "react-hook-form";

interface formInterface {
  name: string;
}
const ChatSendUi = () => {
  const { register, handleSubmit } = useForm<formInterface>();
  const { sendChat } = useChatStore();

  const onSubmit: SubmitHandler<formInterface> = async (data) => {
    await sendChat(data.name);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-3 p-4 border-t border-gray-300"
      >
        <label className="flex items-center justify-center w-10 h-10 text-gray-600 bg-black rounded-full cursor-pointer">
          <input type="file" className=" hidden" />
          📎
        </label>

        <input
          {...register("name")}
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default ChatSendUi;

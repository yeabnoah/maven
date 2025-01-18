import useChatStore from "@/store/chat.store";
import { useEffect } from "react";
import ChatHeader from "./chatHeader";
import MessageSkeleton from "./messageScheleton";
import ChatSendUi from "./chatSendUi";

const ChatContainer = () => {
  const { selectedUser, isMessageLoading, getMessages, messages } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser?.id as string);
  }, [selectedUser, getMessages, selectedUser?.id]);

  if (isMessageLoading) {
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
    </div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto justify-between">
      <ChatHeader />
      {/* <div className="flex-1 overflow-y-auto p-4 space-y-4"></div> */}
      <div className=" mx-1 my-2 text-white text-right">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className=" bg-background py-2 my-2 w-fit p-5 rounded-r-xl rounded-tl-xl"
            >
              <h1 className=" text-xl">{message.messageContent}</h1>
              {/* {message.image && <img src={message.image} />} */}
            </div>
          );
        })}
      </div>
      <ChatSendUi />
    </div>
  );
};
export default ChatContainer;

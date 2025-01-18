import useChatStore from "@/store/chat.store";
import ChatHeader from "./chatHeader";
import { useEffect } from "react";
import MessageSkeleton from "./messageScheleton";
import ChatInput from "./chat";

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
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      {/* <div className="flex-1 overflow-y-auto p-4 space-y-4"></div> */}
      <div className=" mx-auto text-white">
        {messages.map((message) => {
          return (
            <div key={message.id}>
              <h1>{message.messageContent}</h1>
              {message.image && <img src={message.image} />}
            </div>
          );
        })}
      </div>
      <ChatInput />
    </div>
  );
};
export default ChatContainer;

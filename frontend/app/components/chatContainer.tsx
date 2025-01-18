import useChatStore from "@/store/chat.store";
import { useEffect, useRef } from "react";
import ChatHeader from "./chatHeader";
import MessageSkeleton from "./messageScheleton";
import ChatSendUi from "./chatSendUi";

const ChatContainer = () => {
  const { selectedUser, isMessageLoading, getMessages, messages } =
    useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(selectedUser?.id as string);
  }, [selectedUser, getMessages, selectedUser?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col ">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-y-scroll flex-col  bg-base-100">
      <ChatHeader />
      <div className="flex-1 min-h-screen overflow-y-auto px-2 sm:px-4 ">
        <div className="flex flex-col space-y-3 mx-auto lg:w-full pt-32 pb-24 ">
          {messages.map((message) => {
            const isSentByMe = message.senderId === selectedUser?.id;
            return (
              <div
                key={message.id}
                className={`flex ${
                  isSentByMe ? "justify-start" : "justify-end"
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] break-words ${
                    isSentByMe
                      ? "bg-gray-200 text-gray-800"
                      : "bg-primary text-white"
                  } px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl ${
                    isSentByMe ? "rounded-tl-none" : "rounded-tr-none"
                  } shadow-sm`}
                >
                  {message.messageContent && (
                    <p className="text-sm sm:text-base text-wrap max-w-[50vw]">
                      {message.messageContent}
                    </p>
                  )}
                  {message.image && (
                    <div className="mt-2">
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="max-w-full rounded-lg object-contain max-h-[200px] sm:max-h-[300px]"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className=" ml-20 lg:ml-0 lg:w-[90vh]">
        <ChatSendUi />
      </div>
    </div>
  );
};

export default ChatContainer;

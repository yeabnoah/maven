import { formatMessageTime } from "@/lib/time";
import useChatStore from "@/store/chat.store";
import { useEffect, useRef } from "react";
import ChatHeader from "./chatHeader";
import ChatSendUi from "./chatSendUi";
import MessageSkeleton from "./messageScheleton";

const ChatContainer = () => {
  const {
    selectedUser,
    isMessageLoading,
    getMessages,
    messages,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(selectedUser?.id as string);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessages, selectedUser?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-4 p-4 md:p-6">
          {messages.map((message) => {
            const isSentByMe = message.senderId === selectedUser?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isSentByMe ? "justify-start" : "justify-end"
                  } animate-fade-in`}
              >
                <div
                  className={`max-w-[70%] break-words ${isSentByMe
                    ? "bg-gray-100 text-gray-800"
                    : "bg-[#8B5CF6] text-white"
                    } px-4 py-3 rounded-2xl ${isSentByMe ? "rounded-tl-none" : "rounded-tr-none"
                    } shadow-sm`}
                >
                  <div className="flex flex-col gap-1">
                    {message.messageContent && (
                      <p className="text-sm leading-relaxed">
                        {message.messageContent}
                      </p>
                    )}
                    {message.image && (
                      <div className="mt-2">
                        <img
                          src={message.image}
                          alt="Message attachment"
                          className="max-w-full rounded-lg object-contain max-h-[300px]"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <p className="text-xs opacity-70 mt-1">
                      {formatMessageTime(message?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-100">
        <ChatSendUi />
      </div>
    </div>
  );
};

export default ChatContainer;

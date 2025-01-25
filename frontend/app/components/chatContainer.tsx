import { formatMessageTime } from "@/lib/time";
import useChatStore from "@/store/chat.store";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./chatHeader";
import ChatSendUi from "./chatSendUi";
import MessageSkeleton from "./messageScheleton";

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  messageContent: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

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
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

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
      <div className="flex flex-col h-full bg-gray-50">
        <ChatHeader />
        <MessageSkeleton />
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
            </div>
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-indigo-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="flex flex-col space-y-4 p-4 md:p-6">
          {(messages as Message[]).map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.senderId === selectedUser?.id ? "" : "flex-row-reverse"
              }`}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={selectedUser?.image || "/placeholder.jpg"}
                    alt={selectedUser?.name || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div
                className={`flex flex-col ${
                  message.senderId === selectedUser?.id ? "" : "items-end"
                } max-w-[70%]`}
              >
                <div
                  className={`flex items-center gap-2 mb-1 ${
                    message.senderId === selectedUser?.id
                      ? ""
                      : "flex-row-reverse"
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">
                    {message.senderId === selectedUser?.id
                      ? selectedUser?.name
                      : "You"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>

                <div
                  className={`rounded-2xl p-4 ${
                    message.senderId === selectedUser?.id
                      ? "bg-gray-100 rounded-tl-none"
                      : "bg-indigo-50 rounded-tr-none"
                  }`}
                >
                  {message.messageContent && (
                    <p className="text-gray-900">{message.messageContent}</p>
                  )}
                  {message.image && (
                    <div
                      className="mt-2 cursor-pointer"
                      onClick={() =>
                        message.image && setExpandedImage(message.image)
                      }
                    >
                      <img
                        src={message.image}
                        alt="Message attachment"
                        className="max-w-full max-h-[200px] rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatSendUi />

      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={expandedImage}
              alt="Expanded view"
              className="w-full rounded-lg"
            />
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;

import useChatStore from "@/store/chat.store";
import ChatHeader from "./chatHeader";
import { useEffect } from "react";
import MessageSkeleton from "./messageScheleton";
import ChatInput from "./chat";

const ChatContainer = () => {
  const { selectedUser, isMessageLoading, getMessages } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser?.id as string);
  }, [selectedUser, getMessages]);

  if (isMessageLoading) {
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
    </div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4"></div>
      <ChatInput />
    </div>
  );
};
export default ChatContainer;

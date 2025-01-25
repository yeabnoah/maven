import useChatStore from "@/store/chat.store";
import { X } from "lucide-react";
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, isMessageLoading, getMessages } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser?.id as string);
  }, [selectedUser, getMessages]);

  if (isMessageLoading) {
    return (
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={selectedUser?.image || "/user-placeholder.png"}
                  alt={selectedUser?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>

            {/* User info */}
            <div className="space-y-0.5">
              <h3 className="font-medium text-gray-900">{selectedUser?.name}</h3>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setSelectedUser(null)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

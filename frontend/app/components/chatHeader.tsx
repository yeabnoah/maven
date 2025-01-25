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
    console.log("testing user info better performance");
    return (
      <div className="p-2.5 mt-[5%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <div className="animate-pulse rounded-full w-full h-full" />
              </div>
            </div>

            {/* User info */}
            <div>
              <div className="animate-pulse rounded w-20 h-4" />
            </div>
          </div>

          {/* Close button */}
          <div className="animate-pulse rounded w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 mt-[6.5vh] ml-20 lg:ml-0 w-[92.5vw] lg:w-[65vw] fixed">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.image || "/user-placeholder.png"}
                alt={selectedUser?.name}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.name}</h3>
            {/* <p className="text-sm text-base-content/70">
              {sel.includes(selectedUser._id) ? "Online" : "Offline"}
            </p> */}
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;

"use client";

import useChatStore from "@/store/chat.store";
import { Users } from "lucide-react";
import { useEffect } from "react";
import SidebarSkeleton from "./sidebarScheleton";

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, setSelectedUser, selectedUser } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (!isUsersLoading && users.length === 0) {
    return <SidebarSkeleton />;
  }
  //
  return (
    <div>
      <aside className="w-20 border-r border-r-base-300 min-h-screen mt-[6vh] lg:w-72 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-4">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                // checked={showOnlineOnly}
                // onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">
              {/* ({onlineUsers.length - 1} online) */}
            </span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3 pl-2">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`
              w-full p-3 flex items-center gap-5
              hover:bg-base-300 transition-colors
              ${
                selectedUser?.id === user.id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.image || "/user-placeholder.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.name}</div>
              </div>
            </button>
          ))}

          {users.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              No online users
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;

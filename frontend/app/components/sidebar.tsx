"use client";

import useChatStore from "@/store/chat.store";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./sidebarScheleton";
import useCheckAuth from "@/store/checkAuth";

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, setSelectedUser, selectedUser } =
    useChatStore();

  const { onlineUsers } = useCheckAuth();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user.id))
    : users;

  if (!isUsersLoading && users.length === 0) {
    return <SidebarSkeleton />;
  }
  //
  return (
    <div>
      <aside className="w-20 bg-main border-r border-r-main min-h-screen lg:w-72 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-4">
          <div className="flex items-center gap-2">
            <Users className="size-6" color="white" />
            <span className="font-medium hidden lg:block text-white">
              Contacts
            </span>
          </div>
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className=" checkbox-accent bg-white checkbox-sm"
              />
              <span className="text-sm text-white">Show online only</span>
            </label>
            <span className="text-xs text-white">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3 pl-2">
          {filteredUsers.map((user) => (
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

                {onlineUsers.includes(user.id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.name}</div>
              </div>
            </button>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-black py-4">No online users</div>
          )}
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
